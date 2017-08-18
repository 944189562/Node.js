var file = require('../models/file.js');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var sd = require('silly-datetime');
//首页
exports.showIndex = function (req, res, next) {
    //Node.js的编程思维，所有的事件都是一步的
    //内层函数不是return回来东西，而是调用高层函数提供的回调函数
    //把数据当多回调函数的参数来使用
    file.getAllAlbums(function (err, allAlbums) {
        if (err) {
            next();
            return;
        }
        res.render('index', {
            "albums": allAlbums
        });
    })
}
//相册页
exports.showAlbum = function (req, res, next) {
    //遍历相册中的所有图片
    var albumName = req.params['albumName'];
    //具体业务交给model
    file.getAllImagesByAlbumName(albumName, function (err, imagesArray) {
        if (err) {
            next();
            return;
        }
        res.render('album', {
            'albumName': albumName,
            'images': imagesArray
        });
    })
}
//上传页面
exports.showUp = function (req, res, next) {
    file.getAllAlbums(function (err, allAlbums) {
        if (err) {
            next();
            return;
        }
        res.render('up', {
            "albums": allAlbums
        });
    })
}
//上传图片
exports.doPost = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + '/../' + '/tempup/');
    form.parse(req, function (err, fields, files) {
        if (err) {
            next();
            return;
        }
        //判断文件尺寸
        var size = parseInt(files.img.size);
        if (size > 1024) {
            res.send('图片尺寸应该小于1M');
            fs.unlink(files.img.path);
            return;
        }
        //改名
        var dir = fields.dir;
        var date = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 8999 + 1000);
        var extname = path.extname(files.img.name);
        var oldpath = files.img.path;
        var newpath = path.normalize(__dirname + '/../' + '/uploads/' + dir + '/' + date + ran + extname);
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                next();
                return;
            }
            res.send('成功上传');
        })
    });
}