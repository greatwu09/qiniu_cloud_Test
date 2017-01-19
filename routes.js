var path    = require("path");
var todo = require('./models/todo');

module.exports = {
  configure: function(app) {

    app.get('/',function(req,res){
      //res.sendFile(path.join(__dirname+'/welcome.html'));
      res.sendFile(path.join(__dirname+'/index.html'));
      //__dirname : It will resolve to your project folder.
    });

    app.get('/todo/', function(req, res) {
      todo.get(res);
    });

    app.post('/todo/', function(req, res) {
      todo.create(req.body, res);
    });

    app.put('/todo/', function(req, res) {
      todo.update(req.body, res);
    });

    app.delete('/todo/:id/', function(req, res) {
      todo.delete(req.params.id, res);
    });
  }
};
