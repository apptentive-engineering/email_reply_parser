require('expect.js');
var fs = require('fs');
var path = require("path");
var repa = require('../main');

var emailDir = __dirname + "/emails/";

var emails = {};



fs.readdir(emailDir, function(err, files) {
    files.forEach(function(file) {
        emails[path.basename(file, path.extname(file))] = fs.readFileSync(emailDir + file);
    });
    for (var i in emails) {
        console.log(repa(emails[i]));
        console.log("__________", i);
    }
});
