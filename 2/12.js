/**
 * Created by Danny on 2015/9/20 15:35.
 */
var http = require("http");
var formidable = require('formidable');
var util = require("util");

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
            console.log(fields);
            console.log(files);
            //所有的文本域、单选框，都在fields存放；
            //所有的文件域，files
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end("success:"+util.inspect({fields: fields, files: files}));
        });
    }
});

server.listen(3000, "127.0.0.1");
console.log('server listen 127.0.0.1:3000');