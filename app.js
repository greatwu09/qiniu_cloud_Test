var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/route');
var api = require('./routes/api');
var app = express();
//20170118
var mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
// ����ģ���ļ�����չ��Ϊhtml
app.engine('html', require('ejs').renderFile); // ��ejsģ������������'.html'��׺���ļ�
app.set('view engine', 'html');

// ����public�ļ�Ŀ¼�ʾ�̬Ŀ¼
app.use(express.static(path.join(__dirname, 'public'),{index:false}));
app.use(express.static(path.join(__dirname, 'common'),{index:false}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//20170118
var db_config = {
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'bcaf52a66bd308',
  password: '106519b9',
  database: 'heroku_0a38ee070c97de9'
};


var connection;
var dataRows;

function handleDisconnect() {
  console.log('1. connecting to db:');
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              	// The server is either down
    if (err) {                                     // or restarting (takes a while sometimes).
      console.log('2. error when connecting to db:', err);
      setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
    }                                     	// to avoid a hot loop, and to allow our node script to
  });                                     	// process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('3. db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
      handleDisconnect();                      	// lost due to either server restart, or a
    } else {                                      	// connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

function getDataFromDB(){
  connection.query('SELECT * from employees', function(err, rows, fields) {
    if (err) {
      console.log('error: ', err);
      throw err;
    }

    return rows;
  });
}

handleDisconnect();
dataRows = getDataFromDB();


exports.dataRows = dataRows;


var serverPort = process.env.PORT || 5000;
app.listen(serverPort);
console.log("0000");

module.exports = app;
