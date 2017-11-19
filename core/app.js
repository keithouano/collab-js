var express     = require("express");

module.exports = function (app) {

  // ROUTES
  // Index page
  app.get('/', function(req, res){
  res.sendfile(__dirname + '/src/static/html/index.html');
  });
  
  // Drawings
  app.get('/d/*', function(req, res){
  res.sendfile(__dirname + '/src/static/html/draw.html');
  });
  
  // Static files IE Javascript and CSS
  app.use("/static", express.static(__dirname + '/src/static'));

}