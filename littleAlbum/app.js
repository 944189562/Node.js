var express = require('express');
var app = express();
var router = require('./controller');

//设置模板引擎
app.set('view engine', 'ejs');
//路由中间件
//静态文件夹
app.use('/', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/uploads'));
//首页
app.get('/', router.showIndex);
//相册页
app.get('/:albumName', router.showAlbum);
//上传
app.get('/up',router.showUp);
app.post('/up',router.doPost)
//404
app.use(function (req, res) {
    res.render('err');
});

app.listen(3000);
console.log('listen server 127.0.0.1:3000');