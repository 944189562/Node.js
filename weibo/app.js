var express = require('express'),
    router = require('./router/router.js'),
    session = require('express-session'),
    app = express();

//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//模板引擎
app.set('view engine', 'ejs');

//静态文件
app.use(express.static('./public'));
app.use('/avatar', express.static('./avatar'));

//路由表
app.get('/', router.showIndex);
app.get('/login', router.showLogin);
app.post('/doLogin', router.doLogin);
app.get('/regist', router.showRegist);
app.post('/doRegist', router.doRegist);
app.get('/avatar', router.showAvatar);
app.post('/doAvatar', router.doAvatar);
app.get('/cut', router.showCut);
app.post('/doCut', router.doCut);

app.listen(3000);
console.log('server listen 127.0.0.1:3000');