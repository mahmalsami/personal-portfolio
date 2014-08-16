/*global require process __dirname console*/


// Default modules
var express = require('express');
var path = require('path');
var app = express();

var port = process.env.PORT || 3005;

// Default configuration
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('app-name secret here'));
app.use(express.session());
app.use(app.router);
app.use(express['static'](path.join(__dirname, '../public')));
app.locals.pretty = false;
app.locals.pagination = false;


// Development configuration
if ('development' === app.get('env')) {
  app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
  }));
  app.locals.pretty = true;
}


// Default Routes
app.get('/', function(req, res) {
  res.render('red-app/index');
});
app.get('/index.html', function(req, res) {
  res.render('red-app/index');
});
app.get('/fonts.html', function(req, res) {
  res.render('red-app/fonts');
});
app.get('/styleguide.html', function(req, res) {
  res.render('red-app/styleguide');
});


// Routes
app.get('/home.html', function(req, res) {
  res.render('red-app/home');
});
app.get('/animated.html', function(req, res) {
  res.render('red-app/animated');
});
app.get('/caroussel.html', function(req, res) {
  res.render('red-app/caroussel');
});
app.get('/form.html', function(req, res) {
  res.render('red-app/form');
});
app.get('/gallery.html', function(req, res) {
  res.render('red-app/gallery');
});
app.get('/introvideo.html', function(req, res) {
  res.render('red-app/introvideo');
});
app.get('/playlist.html', function(req, res) {
  res.render('red-app/playlist');
});
app.get('/blogeuse.html', function(req, res) {
  res.render('red-app/blogeuse');
});
app.get('/push.html', function(req, res) {
  res.render('red-app/push');
});
app.get('/share.html', function(req, res) {
  res.render('red-app/share');
});

// Return "YOU'RE GOOD BUDDY" to all post requests
app.post('/', function(req, res) {
  res.send(200);
});

// Initialization
app.listen(port, function () {
  console.log("Made app running on port " + port);
});
