var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send("\r\n\ \ getAllClients: /api/client \r\n \
            getSingleClient: /api/client/:id \r\n \
            createClient: /api/client \r\n \
            updateClient: /api/client \r\n \
            removeClient: /api/client");
    res.end();

});

router.get('/api/client', db.getAllClients);

router.get('/api/client/:id', db.getSingleClient);
router.post('/api/client', db.createClient);
router.put('/api/client/:id', db.updateClient);
router.delete('/api/client/:id', db.removeClient);


module.exports = router;
