// 路由
var express = require('express');

var app = express();

app.get('/aaBB', function (req, res) {
    res.send('你好');
})

app.get('/student/:id', function (req, res) {
    var id = req.params['id'];
    var reg = /^[\d]{6}$/;
    if (reg.test(id)) {
        res.send(id);
    } else {
        res.end('格式不正确');
    }
})

app.get('/:username/:oid', function (req, res) {
    var username = req.params['username'];
    var oid = req.params['oid'];
    res.send(username + oid);
})

app.listen(3000);