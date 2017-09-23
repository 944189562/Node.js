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
app.get('/', router.showIndex); //显示首页
app.get('/login', router.showLogin); //显示登录页面
app.post('/doLogin', router.doLogin); //执行登录业务
app.get('/regist', router.showRegist); //显示注册
app.post('/doRegist', router.doRegist); //执行注册业务
app.get('/avatar', router.showAvatar); //显示选择头像页面
app.post('/doAvatar', router.doAvatar); //执行选择头像业务
app.get('/cut', router.showCut); //显示切头像页面
app.post('/doCut', router.doCut); //执行切头像业务
app.post('/post', router.doPost);//发表说说
app.get('/getAllweibo', router.getAllweibo)//列出所有微博
app.get('/getUserinfo', router.getUserinfo)//获取用户信息
app.get('/getweibomount', router.getweibomount)//微博总数
app.get('/user/:username', router.showUser)//个人微博
app.get('/userList', router.userList);//用户列表
app.get('/post/:oid', router.show)//个人微博


app.listen(3000);
console.log('server listen 127.0.0.1:3000');