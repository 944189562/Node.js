var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

app.get('/', function (req, res) {
    res.send('猜你喜欢' + (req.cookies.city || ''));
})

app.get('/hobby', function (req, res) {
    var city = req.query.city;
    var cityArr = req.cookies.city || [];
    cityArr.push(city);
    res.cookie('city', cityArr);
    res.send(req.cookies.city);
})

app.listen(3000);
console.log('server listen 127.0.0.1:3000');