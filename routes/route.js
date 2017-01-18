/**
 * API ����·��
 * @type {exports}
 */
var express = require('express');
var router = express.Router();

var appHere = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.send(['Hello World!!!! HOLA MUNDO!!!!', appHere.dataRows]);
});

module.exports = router;