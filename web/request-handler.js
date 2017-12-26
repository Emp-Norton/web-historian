var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');

var actions = {
  'GET': function(request, response) {
    var urlPath = url.parse(request.url).pathname
    if (urlPath === '/') urlPath = '/index.html';
    helpers.serveAssets(response, urlPath, function() {
      if (urlPath[0] === '/') { urlPath = urlPath.slice(1); }

      archive.isUrlInList(urlPath, function(found){
        if (found) {
          helpers.sendRedirect(response, '/loading.html');
        } else {
          helpers.send404(response);
        }
      })
    })
  },

  'POST': function(request, response) {
    helpers.collectData(request, function(data) {
      var url = data.split('=')[1].replace('http://', '');
      archive.isUrlInList(url, function(found){
        if (found) {
          archive.isUrlArchived(url, function(exists) {
            if (exists){
              helpers.sendRedirect(response, '/' + url);
            } else {
              helpers.sendRedirect(response, '/loading.html');
            }
          })
        } else {
          archive.addUrlToList(url, function() {
            helpers.sendRedirect(response, '/loading.html');
          })
        }
      })
    })
  }
}

exports.handleRequest = function(request, response) {
  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    helpers.sendResponse(response, 'not found', 404);
  }
}











// exports.handleRequest = function (req, res) {
//   var path = './public';
//   var asset = req.url;
   
//   if (req.method === 'POST') {
//     var requestedUrlBuffer = [];
//     req.on('data', (data) => {
//       requestedUrlBuffer.push(data);
//     }).on('end', () => {
//       var requestedUrl = Buffer.concat(requestedUrlBuffer).toString();
//       requestedUrl = requestedUrl.split('=')[1];
//       archive.isUrlInList(requestedUrl, function(existsInList) {
//         if (!existsInList) {
//           archive.isUrlArchived(requestedUrl, function(isInArchive) {
            
//             if (isInArchive) {
          
//             } else {
//               archive.addUrlToList(requestedUrl, function() {
//                 console.log('callback invoked');
//                 res.writeHead(302, exports.headers);
                
//                   fs.readFile('./public/loading.html', function(err, file) {
//                     if (!err) {
//                       res.end(file);
//                     }
//                   });
                
//               });
//             }
//           });
//         }
//       });
      
//     });
   

//   }

//   if (req.method === 'GET') {
//     if (req.url === '/') {

//       helper.getIndex(res, '/index.html', function() {
//         console.log('file served');
//       });
//     } else {
//       helper.serveAssets(res, req.url, function() {
//         console.log('file served');
//       });
//     }
//   }
 
  //res.end(archive.paths.list);
//};
