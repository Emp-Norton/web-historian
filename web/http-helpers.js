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

exports.serveAssets = function(response, asset, callback) {
  fs.readFile(archive.paths.siteAssets + asset, 'utf8', function(err, data){
    if (err) { 
      fs.readFile(archive.paths.archivedSites + asset, 'utf8', function(err, data){
        if (err){ // not in eihter location
          callback ? callback() : exports.send404(res);
        } else { // found in archives
          exports.sendResponse(response, data);
        }
      })
    } else {
      exports.sendResponse(response, data);
    } 
  });
};

exports.sendRedirect = function(response, location, status) {
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end()
}

exports.sendResponse = function(response, asset, status){ // nearly the same as serveAssets?
  status = status || 200;
  response.writeHead(status, exports.headers);
  response.end(asset);
}

exports.send404 = function(response) {
  exports.sendResponse(response, '404: Page not found', 404);
}

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk){
    console.log('chunk ', chunk)
    data += chunk
  });
  console.log('data ', data)
  request.on('end', function(){
    callback(data);
  })
}

// As you progress, keep thinking about what helper functions you can put here!
