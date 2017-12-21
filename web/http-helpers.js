var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {

  fs.readFile(archive.paths.archivedSites + asset, function(error, file) {
    if (error) {
      res.writeHead(404, exports.headers);
      res.end('couldnt find file');
    } else {
      res.writeHead(200, exports.headers);
      res.end(file);
    }
  });
};

exports.getIndex = function(res, asset) {
  fs.readFile(archive.paths.siteAssets + asset, function(error, file) {
    if (error) {
      console.log(error);
      res.writeHead(404, exports.headers);
      res.end('couldnt find file');
    } else {
      res.writeHead(200, exports.headers);
      res.end(file);
    }
  });
};




// As you progress, keep thinking about what helper functions you can put here!
