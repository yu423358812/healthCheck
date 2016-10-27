var express = require('express');
var router = express.Router();
var fs = require("fs");
var https=require('https');

var endpoint=require('../Dao/endpoint');

/* GET home page. */
router.get('/', function(req, res) {

    endpoint.find({},function(err,doc){
        if(err){
            res.send(err);
        }else{
            res.render('index',{endpoints: doc});
        }
    });

  // var data = fs.readFileSync('./json/endpoints.json');
  // var endpoints=JSON.parse(data).endpoints;
  // checkHealth(endpoints);


  // function checkHealth(endpoints){
  //   endpoints.forEach(function (endpoint) {
  //     monitor(endpoint,function(data){
  //       res.render("index");
  //     });
  //   });
  // }
  //
  // function monitor(endpoint,callback){
  //   console.log("hello");
  //   var options={
  //     'host':'encrypted.google.com',
  //     'path':'/',
  //     'method':endpoint.method
  //   };
  //
  //   var request=https.request( options, function(response){
  //     var body="";
  //     response.on("data" , function (chunk) {
  //       body+=chunk.toString('utf8');
  //     })
  //     response.on("end" , function () {
  //       console.log(endpoint.id);
  //       callback(body);
  //     })
  //   });
  //   request.end();
  // }
});

// endpoint form manipulate
router.get('/addEndpoint', function(req, res){
    res.render("addEndpoint");
});
router.post('/addEndpoint', function(req, res){
    var newEndpoint=req.body;
    console.log(newEndpoint);
    endpoint.create(newEndpoint, function(err,doc){
        if(err) {
            console.log(err);
        } else {
            res.redirect("addEndpoint");
        }
    });
});

module.exports = router;
