var http = require('http');
var ejs = require('ejs');
var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('./view/index.ejs', function (err, data) {
        var template = data.toString();
        var dictionary = {a: 16, news: ['1', '2', '3']};
        var html = ejs.render(template, dictionary);

        res.writeHead(200, {'Content-type': 'text/html;charset=UTF8'});
        res.end(html);
    })
}).listen(3000, '127.0.0.1');
console.log('server listen 127.0.0.1:3000');
