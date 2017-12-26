var fs = require('fs');
var path = require('path');
var request = require('request');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../web/archives/sites'),
  list: path.join(__dirname, '../web/archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (callback) callback(data.toString().split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  var result = false;
  exports.readListOfUrls(function(returnedData) {
    returnedData.forEach(entry => {
      if (url === entry) {
        result = true;
      }
    });
    callback(result);
  }); 
};

exports.addUrlToList = function(url, callback) {
  var toAppend = url + '\n';
  fs.appendFile(exports.paths.list, toAppend, (err) => {
    if (!err) {
      console.log('finished appending ' + url + ' to ' + exports.paths.list);
      callback();
    }
  });

};

exports.isUrlArchived = function(url, callback) {
  var result = false;
  fs.readdir(exports.paths.archivedSites, function(error, files) {
    files.forEach(file => {
      if (file === url) {
        result = true;
      }
    });
    
    callback(result);
    return result;
  });
  
};

exports.downloadUrls = function(urls) {
// check list for requested url that haven't been downloaded
  // download them
};







