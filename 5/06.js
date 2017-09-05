var express = require('express');
var session = require('express-session');
var formidable = require('formidable');
var db = require('./model/db.js');
var app = express();

app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.get('/', function (req, res) {
    if (req.session.login == '1') {
        res.send('成功登录');
    } else {
        res.send('未登录');
    }
})

app.get('/login', function (req, res) {
    res.render('login');
})

app.post('/checklogin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            return;
        }
        var username = fields.username;
        var password = fields.password;
        db.find('users', {'username': username}, function (err, result) {
            if (result.length == 0) {
                res.send('用户名不存在');
                return;
            }
            if (password == result[0].password) {
                req.session.login = '1';
                res.send(result[0].username + '成功登录');
            } else {
                res.send('密码错误');
            }
        })
    });
})

app.listen(3000);
console.log('server listen 127.0.0.1:3000');