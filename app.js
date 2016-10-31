var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');
var https=require('https');
var endpointTable=require('./Dao/endpointTable');
var appTable=require('./Dao/appTable');
var jobsTable=require('./Dao/jobsTable');

// connect to mongodb
var configDB = require('./config/database.js');
var db=mongoose.connect(configDB.url);
db.connection.on("error", function (error) {
  console.log("database connect error：" + error);
});
db.connection.on("open", function () {
  console.log("database connect success");
});

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);




// postman function
var interval = setInterval(function() {
  jobsTable.find({},{job:1},function(err,data){
    if(err){
      console.log(err);
    }else{
      var getJobs=data;

      getJobs.forEach(function (doc) {
        var job=doc.job;
        endpointTable.find({job : job},function(err,element){
          if(err){
            console.log(err);
          }else{

            // manipulate http request
            if(element[0]){
              element.sort(sortNumber);
              async.eachSeries(element, function(endpoint, next) {
                console.log(endpoint);
                var options = {
                  hostname: endpoint.endpoints.url,
                  port: endpoint.endpoints.port,
                  path: endpoint.endpoints.path,
                  method: endpoint.endpoints.method
                };

                var req = https.request(options, function(res) {
                  console.log(res.statusCode);
                  if(res.statusCode == '200'){
                    endpoint.endpoints.status='ok';
                    endpoint.markModified('status');
                    endpoint.save(function(err,data){
                      if(err) {
                        console.log(err);
                      } else {
                        console.log('Update to Success!');
                      }
                    });
                  }else{
                    endpoint.endpoints.status='false';
                    endpoint.markModified('status');
                    endpoint.save(function(err,data){
                      if(err) {
                        console.log(err);
                      } else {
                        console.log('Update to False!');
                      }
                    });
                  }
                  next();
                });
                req.end();
              }, function(err){
                console.log("err is:" + err);
              });
            }else{}

            // manipulate http request end
          }
        });
      });

    }
  });
}, 10*1000);


function sortNumber(a, b)
{
  return a.endpoints.sequence-b.endpoints.sequence;
}
















// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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


module.exports = app;
