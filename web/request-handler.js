var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var path = './public';
  var asset = req.url;
   
  if (req.method === 'POST') {
    var requestedUrlBuffer = [];
    req.on('data', (data) => {
      requestedUrlBuffer.push(data);
    }).on('end', () => {
      var requestedUrl = Buffer.concat(requestedUrlBuffer).toString();
      requestedUrl = requestedUrl.split('=')[1];
      archive.isUrlInList(requestedUrl);
      archive.addUrlToList(requestedUrl, function() {
        console.log('sent ' + requestedUrl);
      });
    });

  }

  if (req.method === 'GET') {
    if (req.url === '/') {
      helper.serveAssets(res, '/index.html', function() {
        console.log('file served');
      });
    } else {
      helper.serveAssets(res, req.url, function() {
        console.log('file served');
      });
    }
  }
 
  //res.end(archive.paths.list);
};
