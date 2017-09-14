var express = require('express'),
    formidable = require('formidable'),
    fs = require('fs'),
    gm = require('gm');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', function (req, res, next) {
    res.render('crop');
})

app.post('/docrop', function (req, res, next) {
    var form = formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
           var width = fields.width,
            height = fields.height,
            top = fields.top,
            left = fields.left;
        gm('./picture/3.jpg' + filename)
            .crop(width, height, top, left)
            .resize()
            .write('./picture/3-3.jpg' + filename, function (err) {
                if (err) {
                    res.send('-1');
                    return;
                }
                res.send('1');
            })
    });

})

app.listen(3000);