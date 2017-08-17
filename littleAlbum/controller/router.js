var file = require('../models/file.js');
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