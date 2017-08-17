var fs = require('fs');
//读取文件夹
exports.getAllAlbums = function (callback) {
    fs.readdir('./uploads', function (err, files) {
        if (err) {
            return callback('没有找到uploads文件夹', null);
        }
        var allAlbums = [];
        (function iterator(i) {
            if (i == files.length) {
                console.log(allAlbums);
                return callback(null, allAlbums);
            }
            fs.stat('./uploads/' + files[i], function (err, stats) {
                if (err) {
                    return callback('找不到文件夹' + files[i], null);
                }
                if (stats.isDirectory()) {
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            })
        })(0)
    })
}
//通过文件名，得到该文件夹下的所有图片
exports.getAllImagesByAlbumName = function (albumName, callback) {
    fs.readdir('./uploads/' + albumName, function (err, files) {
            if (err) {
                return callback('没有找到uploads文件夹', null);
            }
            var allImages = [];
            (function iterator(i) {
                if (i == files.length) {
                    console.log(allImages);
                    return callback(null, allImages);
                }
                fs.stat('./uploads/' + albumName + '/' + files[i], function (err, stats) {
                    if (err) {
                        return callback('找不到文件夹' + files[i], null);
                    }
                    if (stats.isFile()) {
                        allImages.push(files[i]);
                    }
                    iterator(i + 1);
                })
            })(0)
        }
    )
}
