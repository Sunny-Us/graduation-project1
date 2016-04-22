var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var multer  = require('multer');

var routes = require('./routes/index');
var test = require('./routes/test');
var users = require('./routes/users');
var zone = require('./routes/personal_zone');
var serviceDetail = require('./routes/service_detail');
var orderDetail = require("./routes/order_detail");
var admin = require("./routes/admin");
var workerZone = require("./routes/worker_zone");
var workerOrderDetail = require("./routes/worker_order_detail");
var adminZone = require("./routes/admin_zone");
var app = express();

app.use(express.static('public'));
// app.use(multer({ dest: './uploads/'}));

var swig = require('swig'),
  people;

app.set('view engine','html');
app.engine('html',swig.renderFile);
// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/test', test);
app.use('/users', users);
app.use('/zone',zone);
app.use('/serviceDetail',serviceDetail);
app.use('/orderDetail',orderDetail);
// app.use('/admin',admin);
app.use('/workerZone',workerZone);
app.use('/workerOrderDetail',workerOrderDetail);
app.use('/adminZone',adminZone);

app.get('/admin-user',function(req,res){
  postData={
    method:"query",
    role:0
  };
  request.post({
    url:'http://127.0.0.1:8081/user/user',
    formData:postData
  },function(error,response,body){
    if(!error && response.statusCode == 200){
      res.render('admin.html',{data:JSON.parse(body).data});
    }
  })
});
app.get('/admin-worker',function(req,res){
  postData={
    method:"query",
    role:1
  };
  request.post({
    url:'http://127.0.0.1:8081/user/user',
    formData:postData
  },function(error,response,body){
    if(!error && response.statusCode == 200){
      res.render('admin-worker.html',{data:JSON.parse(body).data});
    }
  })
});
app.get('/admin-admin',function(req,res){
  postData={
    method:"query",
    role:2
  };
  request.post({
    url:'http://127.0.0.1:8081/user/user',
    formData:postData
  },function(error,response,body){
    if(!error && response.statusCode == 200){
      res.render('admin-admin.html',{data:JSON.parse(body).data});
    }
  })
});
app.get('/admin-serviceType',function(req,res){
  postData={
    method:"query",
    type:"category"
  };
  request.post({
    url:'http://127.0.0.1:8081/service',
    formData:postData
  },function(error,response,body){
    if(!error && response.statusCode == 200){
      res.render('admin-serviceType.html',{data:JSON.parse(body).data});
    }
  })
});
app.get('/admin-service',function(req,res){
  postData={
    method:"query",
    type:"service"
  };
  request.post({
    url:'http://127.0.0.1:8081/service',
    formData:postData
  },function(error,response,body){
    if(!error && response.statusCode == 200){
      res.render('admin-service.html',{data:JSON.parse(body).data});
    }
  })
});
app.get('/admin-order',function(req,res){
  request.post({
    url:'http://127.0.0.1:8081/order',
    formData:{
      method:"query",
      token: req.cookies.key,
      status:JSON.stringify([1])
    },
    'content-type':'application/x-www-form-urlencoded'
  },function(error,response,body){
    if(!error && response.statusCode == 200){
      res.render('admin-order.html',{data:JSON.parse(body).data});
    }
  });
});
app.get('/accept-order',function(req,res){
  request.post({
    url:'http://127.0.0.1:8081/order',
    formData:{
      method:"query",
      token: req.cookies.key,
      status:JSON.stringify([2,3])
    },
    'content-type':'application/x-www-form-urlencoded'
  },function(error,response,body){
    if(!error && response.statusCode == 200){
      res.render('accept-order.html',{acceptData:JSON.parse(body).data});
    }
  });
});
app.get('/finished-order',function(req,res){
  request.post({
    url:'http://127.0.0.1:8081/order',
    formData:{
      method:"query",
      token: req.cookies.key,
      status:JSON.stringify([4])
    },
    'content-type':'application/x-www-form-urlencoded'
  },function(error,response,body){
    if(!error && response.statusCode == 200){
      res.render('finished-order.html',{acceptData:JSON.parse(body).data});
    }
  });
});
app.get('/admin-comment',function(req,res){
  request.post({
    url:'http://127.0.0.1:8081/comment',
    formData:{
      method:"query",
      token: req.cookies.key
    },
    'content-type':'application/x-www-form-urlencoded'
  },function(error,response,body){
    if(!error && response.statusCode == 200){
      res.render('admin-comment.html',{data:JSON.parse(body).data});
    }
  });
});

// app.post('/upload-img',function(req,res){
//   console.log('hahaha,upload');
//   console.log("这是啥"+req.files.thumbnail.path);
//   // 获得文件的临时路径
//   var tmp_path = req.files.thumbnail.path;
//   // 指定文件上传后的目录 - 示例为"images"目录。 
//   var target_path = './public/images/' + req.files.thumbnail.name;
//   // 移动文件
//   fs.rename(tmp_path, target_path, function(err) {
//     if (err) throw err;
//     // 删除临时文件夹文件, 
//     fs.unlink(tmp_path, function() {
//        if (err) throw err;
//        res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
//     });
//   });
// });

// error handlers
app.use(function(err,req,res,next){
  res.status(404).send('Sorry cannot find that!');
})

app.use(function(err,req,res,next){
  res.status(500).send('Something broke!');
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
