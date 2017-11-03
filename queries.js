const debug = require('debug')('app:queries');
const phone = require('phone');
const conf = require('./conf.js');
const promise = require('bluebird');
const options = {
    // Initialization Options
    promiseLib: promise
};
const pgp = require('pg-promise')(options);
const db = pgp(conf.connStr);
const crypto = require('crypto');

function encrypt(text) {
    let cipher = crypto.createCipher(conf.algorithm, conf.password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    let decipher = crypto.createDecipher(conf.algorithm, conf.password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

function decryptAndReplace(phoneField) {
    return decrypt(phoneField).replace(/.(?=.{4})/g, '*');
}

//CRUD OPERATIONS BEGIN HERE

//get all
function getAllClients(req, res, next) {
    db.any('select * from client limit 100')
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                data[i].phone = decryptAndReplace(data[i].phone);
            }
            res.status(200)
                .json({
                    status: 'success',
                    data: data
                });
            //debug('Got data from DB, number of records: %o',data);
        })
        .catch(function (err) {
            console.log('Caught an error' + err);
            return next(err);
        });
}
//get one
function getSingleClient(req, res, next) {
    let clientId = parseInt(req.params.id);
    db.one('select * from client where id = $1', clientId)
        .then(function (data) {
            data.phone = decryptAndReplace(data.phone);
            res.status(200)
                .json({
                    status: 'success',
                    data: {id: data.id, phone: data.phone, email: data.email, json: data.json},
                    message: 'Retrieved one client'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
//post
function createClient(req, res, next) {
    const body = req.body;

    function formatErrorMessage(message) {
        const response = {
            status: 'ERROR',
            message: message
        };
        return response
    }

    function validateEmail(email) {
        let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegExp.test(email);
    }

    if (!body.phone || !body.email) {
        return res.status(400).json(formatErrorMessage('Missing mandatory fields'));
    }

    let isPhoneGBR = phone(body.phone);
    if (isPhoneGBR[1] !== 'GBR') {
        return res.status(400).json(formatErrorMessage('Not a GBR (UK) format phone number!'));
    }

    if (!(validateEmail(body.email))) {
        return res.status(400).json(formatErrorMessage('Email should be an email format, reg exp check!'));
    }

    let formattedBody = Object.assign({}, body);
    delete formattedBody.phone;
    delete formattedBody.email;
    db.none(
        'insert into client(phone, email, json)' +
        'values(${phone}, ${email}, ${json})',
        {phone: encrypt(body.phone), email: body.email, json: formattedBody}
    )
        .then(function () {
            res.status(200).json({
                status: 'success',
                message: 'Inserted one client'
            });
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    getAllClients: getAllClients,
    getSingleClient: getSingleClient,
    createClient: createClient
};