/*
* 图片处理  http://www.graphicsmagick.org/
* 处理图片，安装graphicsmagick软件，设置环境变量
* Where commands include:
      batch - issue multiple commands in interactive or batch mode
  benchmark - benchmark one of the other commands
    compare - compare two images
  composite - composite images together
    conjure - execute a Magick Scripting Language (MSL) XML script
    convert - convert an image or sequence of images 格式转化
       help - obtain usage message for named command
   identify - describe an image or image sequence
    mogrify - transform an image or sequence of images 更改图片尺寸
    montage - create a composite image (in a grid) from separate images
       time - time one of the other commands
    version - obtain release version
   register - register this application as the source of messages
* */
var fs = require('fs'),
    gm = require('gm');
gm('./1.jpg')
    .crop(200, 200, 900, 300)
    .write('./crop.png', function (err) {
        if (!err) console.log('crazytown has arrived');
    })