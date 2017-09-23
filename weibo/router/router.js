var formidable = require('formidable'),
    db = require('../model/db.js'),
    md5 = require('../model/md5.js'),
    fs = require('fs'),
    gm = require('gm'),
    path = require('path');

//首页
exports.showIndex = function (req, res, next) {
    // 判断登录状态
    if (req.session.login == '1') {
        var username = req.session.username,
            login = req.session.login;
    } else {
        var username = '',
            login = false;
    }
    db.find('users', {'username': username}, function (err, result) {
        if (result.length == 0) {
            var avatar = 'moren.jpg';
        } else {
            var avatar = result[0].avatar;
        }
        res.render('index', {
            'login': login == '1' ? true : false,
            'username': login == '1' ? username : '',
            'active': '首页',
            'avatar': avatar
        });
    })
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

//切头像页
exports.showCut = function (req, res, next) {
    res.render('crop', {
        'avatar': req.session.avatar
    });
}

//切头像业务
exports.doCut = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var filename = req.session.avatar,
            width = parseInt(fields.width),
            height = parseInt(fields.height),
            top = parseInt(fields.top),
            left = parseInt(fields.left);
        console.log(fields);
        gm('./avatar/' + filename)
            .crop(width, height, left, top)
            .resize()
            .write('./avatar/' + filename, function (err) {
                if (err) {
                    res.send('-1');
                    return;
                }
                //更改数据库
                db.updateMany('users', {
                        'username': req.session.username
                    }, {
                        $set: {'avatar': req.session.avatar}
                    },
                    function (err, result) {
                        if (err) {
                            res.send('-3');
                            return;
                        }
                        res.send('1');
                    })
            })
    });
}

//发表说说业务
exports.doPost = function (req, res, next) {
    if (req.session.login != '1') {
        res.send('非法闯入，请进行登录操作！');
        return;
    }
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send('-3');
            return;
        }
        var content = fields.content;
        var username = req.session.username;
        db.find('users', {'username': username}, function (err, result) {
            if (err) {
                res.send('-3');
                return;
            }
            db.insertOne('posts', {
                'username': username,
                'dateTime': new Date(),
                'content': content
            }, function (err, result) {
                if (err) {
                    res.send(-1);
                    return;
                }
                res.send('1'); // 注册成功，写入session
            })
        })

    })
}

//获得所有微博业务
exports.getAllweibo = function (req, res, next) {
    var page = req.query.page;
    var obj = req.query.obj || {};
    db.find('posts', obj, {'pagemount': 10, 'page': page, 'sort': {'dateTime': -1}}, function (err, result) {
        if (err) {
            res.json({status: -1, weibo: []});
            return;
        }
        res.json({status: 1, weibo: result});
    })
}

//获得用户信息业务
exports.getUserinfo = function (req, res, next) {
    var username = req.query.username;
    db.find('users', {'username': username}, function (err, result) {
        if (err) {
            res.json({status: -1, userinfo: []});
            return;
        }
        res.json({
            status: 1,
            userinfo: {username: result[0].username, 'avatar': result[0].avatar, 'id': result[0]._id}
        });
    })
}

//微博总数
exports.getweibomount = function (req, res, next) {
    var obj = req.query.obj || {}
    db.getAllData('posts', obj, function (err, mount) {
        if (err) {
            res.json({status: -1, userinfo: []});
            return;
        }
        res.json({mount: Math.ceil(mount / 10)});
    })
}

//个人微博页
exports.showUser = function (req, res, next) {
    if (req.session.login == '1') {
        var username = req.params.username,
            login = req.session.login;
    } else {
        var username = req.params.username,
            login = false;
    }
    db.find('users', {'username': username}, function (err, result) {
        if (result.length == 0) {
            var avatar = 'moren.jpg';
        } else {
            var avatar = result[0].avatar;
        }
        if (login == '1') {
            res.render('user', {
                'login': login == '1' ? true : false,
                'username': username,
                'active': '我的微博',
                'avatar': avatar
            })
        } else {
            res.render('person', {
                'login': login == '1' ? true : false,
                'username': username,
                'active': '我的微博',
                'avatar': avatar
            })
        }

    })
}

exports.userList = function (req, res, next) {
    if (req.session.login == '1') {
        var username = req.session.username,
            login = req.session.login;
    } else {
        var username = '',
            login = false;
    }
    db.find('users', {'username': username}, function (err, result) {
        if (result.length == 0) {
            var avatar = 'moren.jpg';
        } else {
            var avatar = result[0].avatar;
        }
        db.find('users', {}, function (err, result) {
            if (err) {
                res.json({status: -1, userinfo: []});
                return;
            }
            res.render('userList', {
                'login': login == '1' ? true : false,
                'username': login == '1' ? username : '',
                'active': '成员列表',
                'avatar': avatar,
                'data': result
            });
        })
    })
}

//用户列表
exports.