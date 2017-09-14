var fs = require('fs'),
    express = require('express'),
    gm = require('gm');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.render('crop');
})

app.listen(3000);