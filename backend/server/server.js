'use strict';

const log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    {
      type: 'file',
      filename: `log/app.log`,
    },
  ],
  replaceConsole: true,
});

var dotenv = require('dotenv');
dotenv.config();

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
var multer = require('multer');
app.use(multer().none());
app.use(loopback.token({
  model: app.models.accessToken
}));

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/hello', function (req, res) {
  const data = {
    hello: 'world',
    time: new Date(),
  };
  res.header({ 'Content-Type': 'application/json' });
  res.send(JSON.stringify(data));
});



app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module || GLOBAL.PhusionPassenger)
    app.start();
});
