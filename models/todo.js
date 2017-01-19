var connection = require('../connection');

function Todo() {
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from employees', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  /*
  app.get('/getmysqldata', function (request, response)
  {
    console.log('Creating the http server');
    connection.query('SELECT * FROM employees', function(err, rows, fields)
    {
      console.log('Connection result error '+err);
      console.log('no of records is '+rows.length);
      response.writeHead(200, { 'Content-Type': 'application/json'});
      response.end(JSON.stringify(rows));
      response.end();
    });
  });
  */



  this.create = function(todo, res) {
    connection.acquire(function(err, con) {
      con.query('insert into employees set ?', todo, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'TODO creation failed'});
        } else {
          res.send({status: 0, message: 'TODO created successfully'});
        }
      });
    });
  };

  this.update = function(todo, res) {
    connection.acquire(function(err, con) {
      con.query('update employees set ? where id = ?', [todo, todo.id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'TODO update failed'});
        } else {
          res.send({status: 0, message: 'TODO updated successfully'});
        }
      });
    });
  };

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from employees where id = ?', [id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Failed to delete'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };
}

module.exports = new Todo();
