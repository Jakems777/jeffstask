const express = require('express');
const router = express.Router();

const db = require('../queries');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send("\r\n\ \ getAllClients: /api/client \r\n \
            getSingleClient: /api/client/:id \r\n \
            createClient: /api/client");
    res.end();

});

router.get('/api/client', db.getAllClients);
router.get('/api/client/:id', db.getSingleClient);
router.post('/api/client', db.createClient);

module.exports = router;
