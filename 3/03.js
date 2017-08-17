var express = require('express');

var app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('haha', {
        "news": [1, 2, 3, 4]
    })
})

app.listen(3000);