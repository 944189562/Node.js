var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname == '/') {
        pathname += 'index.html'
    }
    var fileURL = './' + path.normalize('./static/' + pathname);
    var extname = path.extname(pathname);
    fs.readFile(fileURL, function (err, data) {
        if (err) {
            // 文件不存在
            res.writeHead(404, {'Content-type': 'text/html;charset=UTF8'});
            res.end('404 页面没有找到');
        }
        getMIME(extname, function (mime) {
            console.log(mime);
            res.writeHead(200, {'Content-type': mime});
            res.end(data);
        })
    })
})

server.listen(3000, '127.0.0.1');

function getMIME(extname, callback) {
    // 读取mime.json文件 获得mime值
    fs.readFile('./mime.json', function (err, data) {
        if (err) {
            throw Error('找不到mime.json文件');
            return;
        }
        var data = JSON.parse(data);
        var mime = data[extname] || 'text/plain';
        return callback(mime);
    })
}