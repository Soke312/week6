var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "./";


var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost/week-5-db");
var mySchema = require('./schema.js').mySchema;
var entries = mongoose.model('entries', mySchema);

mongoose.connection.once('open', function(){
    http.createServer( function (req, res) {
        if(req.method === "POST") {
            var jsonData ="";
            req.on('data', function(chunk){
                jsonData += chunk;
            });
            req.on('end',function() {
                var requestObject = JSON.parse(jsonData);
                var newEntry = entries.find()
                newEntry.exec(function (err, doc) {
                    console.log(doc.toString());
                    doc.save(function (err, doc) {
                        entries.find({}, function (err, doc) {
                            console.log(doc.toString());
                            mongoose.disconnect();
                        });
                    });
                });
            });
      } else if (req.method === "GET" && req.url === "/list"){
            res.setHeader("Content-Type","text/html");
            res.writeHead(200);
            res.write('<html><head><title>week 6 project</title></head>');
            res.write('<body>');
            res.write('\n<div id="list">mySchema</div>');
                res.end('\n</body></html>');

        } else {
            var urlObj = url.parse( req.url, true, false);
            fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
                if (err) {
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
    }).listen(8080);
})
