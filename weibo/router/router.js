var formidable = require('formidable'),
    db = require('../model/db.js'),
    md5 = require('../model/md5.js'),
    fs = require('fs'),
    path = require('path');

//首页
exports.showIndex = function (req, res, next) {
    // 判断登录状态
    if (req.session.login == '1') {
        db.find('users', {'username': req.session.username}, function (err, result) {
            var avatar = result[0].avatar || 'moren.jpg';
            res.render('index', {
                'login': req.session.login == '1' ? true : false,
                'username': req.session.login == '1' ? req.session.username : '',
                'active': '首页',
                'avatar': avatar
            });
        })
    } else {
        res.render('index', {
            'login': req.session.login == '1' ? true : false,
            'username': req.session.login == '1' ? req.session.username : '',
            'active': '首页',
            'avatar': 'moren.jpg'
        });
    }
}

//登录页
exports.showLogin = function (req, res, next) {
    res.render('login', {
        'login': req.session.login == '1' ? true : false,
        'username': req.session.login == '1' ? req.session.username : '',
        'active': '登录'
    });
}

//登录业务
exports.doLogin = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send('-3');
            return;
        }
        var username = fields.username,
            password = fields.password;
        db.find('users', {'username': username}, function (err, result) {
            if (err) {
                res.send('-3');
                return;
            }
            if (result.length == 0) {
                res.send('-1');
                return;
            }
            //设置md5加密
            password = md5(password) + '_zyp';
            if (result[0].password == password) {
                req.session.login = '1';
                req.session.username = username;
                res.send('1');
            } else {
                res.send('-1');
            }
        })
    })
}

//注册页
exports.showRegist = function (req, res, next) {
    res.render('regist', {
        'login': req.session.login == '1' ? true : false,
        'username': req.session.login == '1' ? req.session.username : '',
        'active': '注册'
    });
}

//注册业务
exports.doRegist = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send('-3');
            return;
        }
        var username = fields.username,
            password = fields.password;
        db.find('users', {'username': username}, function (err, result) {
            if (err) {
                res.send('-3');
                return;
            }
            console.log(result, result.length);
            if (result.length != 0) {
                res.send('-1');
                return;
            }
            //设置md5加密
            password = md5(password) + '_zyp';
            db.insertOne('users', {
                'username': username,
                'password': password,
                'avatar': 'moren.jpg'
            }, function (err, result) {
                if (err) {
                    res.send(-3);
                    return;
                }
                req.session.login = '1';
                req.session.username = username;
                res.send('1'); // 注册成功，写入session
            })
        })
    })
}

//设置头像页，登录状态
exports.showAvatar = function (req, res, next) {
    if (req.session.login != '1') {
        res.send('非法闯入，请进行登录操作！');
        return;
    }
    res.render('setAvatar', {
        'login': req.session.login == '1' ? true : false,
        'username': req.session.login == '1' ? req.session.username : '',
        'active': '修改头像'
    });
}

//设置头像业务
exports.doAvatar = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + '/../avatar/');
    form.parse(req, function (err, fields, files) {
        var extname = path.extname(files.file.name);
        var oldname = files.file.path;
        var newname = path.normalize(__dirname + '/../avatar/' + req.session.username + extname);
        fs.rename(oldname, newname, function (err) {
            if (err) {
                res.send('-1');
                return;
            }
            req.session.avatar = req.session.username + extname;
            //跳转到切图的业务
            res.send('1');
        })
    })
}

exports.showCut = function (req, res, next) {
    res.render('crop', {
        'avatar': req.session.avatar
    });
}