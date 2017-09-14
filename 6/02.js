var express = require('express');
var formidable = require('formidable');
var db = require('./model/db.js');
var md5 = require('./model/md5.js');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/login', function (req, res) {
    res.render('login');
})

app.post('/dologin', function (req, res) {
    var form = formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var password = md5(md5(fields.password).substr(4, 8) + md5(fields.password));
        db.find('users', {
            'username': fields.username
        }, function (err, result) {
            if (err) {
                res.json({status: 0, result: null})
                return;
            }
            if (result.length == 0) {
                res.json({status: -2})
                return;
            }
            if (password == result[0].password) {
                res.json({status: 1, result: result});
                return;
            } else {
                res.json({status: -1, result: null})
                return;
            }
        })
    })
})

app.get('/regist', function (req, res) {
    res.render('regist');
})

app.post('/doregist', function (req, res) {
    var form = formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var password = md5(md5(fields.password).substr(4, 8) + md5(fields.password));
        db.insertOne('users', {
            'username': fields.username,
            'password': password
        }, function (err, result) {
            if (err) {
                res.json({status: -1, result: null})
                return;
            }
            res.json({status: 1, result: result});
        })
    })
})

app.listen(3000);