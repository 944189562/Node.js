var express = require('express');

var app = express();

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.get('/', function (req, res) {
    res.render('xixi');
    console.log(req.ip);
})

app.listen(3000);