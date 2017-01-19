var mysql = require('mysql');
/*
var db_config = {
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'bcaf52a66bd308',
  password: '106519b9',
  database: 'heroku_0a38ee070c97de9'
};
*/
function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: "us-cdbr-iron-east-04.cleardb.net",
      user: "bcaf52a66bd308",
      password: "106519b9",
      database: "heroku_0a38ee070c97de9"
    });
  };

  /*
   var connection = mysql.createConnection({
   host: "6CR50201L9.bei.is.keysight.com",
   user: "remote_test",
   password: "remote_test",
   database: "new_for_test"
   });
   */

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };

/*
  this.handleDisconnect = function() {
    console.log('1. connecting to db:');
    //connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.

    connection.connect(function(err) {              	// The server is either down
      if (err) {                                     // or restarting (takes a while sometimes).
        console.log('2. error when connecting to db:', err);
        //setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
      }                                     	// to avoid a hot loop, and to allow our node script to
    });                                     	// process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('3. db error', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
        //handleDisconnect();                      	// lost due to either server restart, or a
      } else {                                      	// connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  };
*/
}

module.exports = new Connection();
