var express = require('express');

var app = express();

var a = 100;

app.get('/:username/:id', function (req, res, next) {
    var username = req.params.username;
    if(检索数据库){
        console.log(1);
        res.send('用户信息：' + req.params[0] + req.params[1]);
    }else{
        next();
    }
})

app.get('/admin/login', function (req, res) {
    console.log(2);
    res.send('管理员登录');
})

app.get('/',function () {
    
})

app.listen(3000);