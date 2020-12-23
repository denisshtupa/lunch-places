// server.js
// var express = require('express');
// var path = require('path');
// var serveStatic = require('serve-static');
// app = express();
// app.use(serveStatic("/dist"));
// var port = process.env.PORT || 5000;
// app.listen(port);
// console.log('server started '+ port);

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/'}
);
});

app.listen(process.env.PORT || 5000);