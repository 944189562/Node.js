var express = require('express');
var session = require('express-session');

var app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.get('/', function (req, res) {
    console.log(req.session.username);
    if (req.session.login) {
        res.send('成功登陆');
    } else {
        res.send('未登陆');
    }
})

app.get('/login', function (req, res) {
    req.session.login = 1;
    req.session.username = '考拉';
    res.send('成功登陆');
})

app.listen(3000);
console.log('server listen 127.0.0.1:3000');