var express = require("express");
var path    = require("path");
var mysql = require('mysql');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');
var app = express();



//var logger = require('morgan');
//app.use(logger); //replaces your app.use(express.logger());



var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var api = require('./routes_qiniu_upload/api');

//app.use(express.logger());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);
/////////////////20170108 done

app.use(express.static(path.join(__dirname, 'assets')));

app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/images', express.static(path.join(__dirname, 'images')))

connection.init();
routes.configure(app);
/*
var db_config = {
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b6d6c6e8740d20',
    password: 'b3f75ada',
    database: 'heroku_1daa39da0375291'
};
*/

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
