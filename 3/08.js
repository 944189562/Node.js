var express = require('express');

var app = express();
// app.use中间件，路由不是精确匹配的
app.use('/admin', function (req, res) {
    res.send('你好');
    console.log(req.originalUrl);
    console.log(req.baseUrl);
    console.log(req.path);
})

app.listen(3000);