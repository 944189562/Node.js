var express = require('express');

var app = express();

app.get('/', function (req, res) {
    console.log(req.query);
    res.send();
})

app.listen(3000);