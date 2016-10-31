var express = require('express');
var router = express.Router();
var fs = require("fs");
var https=require('https');
// mongodb model
var endpointTable=require('../Dao/endpointTable');
var appTable=require('../Dao/appTable');
var jobsTable=require('../Dao/jobsTable');


// home.ejs
router.get('/home', function(req, res){
            res.render("home");
});

// show apps and owners status
router.get('/ngShowApp', function(req, res){
    appTable.find({},function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send(JSON.stringify(data));
        }
    });
});

// add App
router.post('/ngCreateApp', function(req, res){
    var addApp=req.body.data;
    appTable.create(addApp, function(err,data){
        if(err) {
            console.log(err);
        } else {
            res.send("success");
        }
    });
});

// add Job
router.post('/ngCreateJob', function(req, res){
    var addJob=req.body.data;
    jobsTable.create(addJob, function(err,data){
        if(err) {
            console.log(err);
        } else {
            res.send("success");
        }
    });
});

// add Api
router.post('/ngCreateApi', function(req, res){
    var addApi=req.body.data;

    var endpoint = new endpointTable({
        appName : addApi.appName,
        job : addApi.job,
        createdDate : '',
        developer : '',
        status : '',
        summary : '',
        endpoints: {
            id: '',
            appName: addApi.appName,
            sequence: addApi.sequence,
            summary: '',
            url: addApi.url,
            method: addApi.method,
            port: addApi.port,
            contact: '',
            contactNo: '',
            contactEmail: '',
            status: '',
            header: '',
            body: '',
            response : '',
            created: '',
            lastUpdated: '',
            isJson: '',
            switch: ''
        }
    });

    endpoint.save(function(err,data) {
        if(err) {
            console.log(err);
        } else {
            res.send("success");
        }
    });
});


// show all endpoints
router.get('/endpointsView', function(req, res){
        res.render('endpointsView');
});

router.get('/ngendpointsView', function(req, res){
        endpointTable.find({},function(err,data){
             res.send(JSON.stringify(data));
        });
});































module.exports = router;
