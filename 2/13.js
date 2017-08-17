/**
 * Created by Danny on 2015/9/20 15:35.
 */
var http = require("http");
var formidable = require('formidable');
var util = require("util");
var fs = require('fs');
var sd = require('silly-datetime');
var path = require('path');

//创建服务器
var server = http.createServer(function (req, res) {
    //如果你的访问地址是这个，并且请求类型是post
    if (req.url == "/dopost" && req.method.toLowerCase() == "post") {
        //Creates a new incoming form.
        var form = new formidable.IncomingForm();
        //设置文件上传存放地址
        form.uploadDir = "./test";
        form.encoding = 'utf-8';
        form.keepExtensions = true;
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, function (err, fields, files) {
            if (err) {
                throw err;
            }
            var date = sd.format(new Date(), 'YYYYMMDDHHmmss');
            var ran = parseInt(Math.random() * 8999 + 1000);
            var extname = path.extname(files.tupian.name);
            //改名
            var oldPath = __dirname + '/' + files.tupian.path;
            var newPath = __dirname + '/test/' + date + ran + extname;
            // fs.rename方法改名
            fs.rename(oldPath, newPath, function (err) {
                if (err) {
                    throw err;
                }
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end("success:" + util.inspect({fields: fields, files: files}));
                console.log('改名成功');
            });

        });
    } else if (req.url == '/') {
        fs.readFile('./index.html', function (err, data) {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(data);
        })
    } else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('404');
    }
});

server.listen(3000, "127.0.0.1");
console.log('server listen 127.0.0.1:3000');