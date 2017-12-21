var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var fs = require('fs');
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
      archive.isUrlInList(requestedUrl, function(existsInList) {
        if (!existsInList) {
          archive.isUrlArchived(requestedUrl, function(isInArchive) {
            
            if (isInArchive) {
          
            } else {
              archive.addUrlToList(requestedUrl, function() {
                console.log('callback invoked');
                res.writeHead(302, exports.headers);
                
                  fs.readFile('./public/loading.html', function(err, file) {
                    if (!err) {
                      res.end(file);
                    }
                  });
                
              });
            }
          });
        }
      });
      
    });
   

  }

  if (req.method === 'GET') {
    if (req.url === '/') {

      helper.getIndex(res, '/index.html', function() {
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
