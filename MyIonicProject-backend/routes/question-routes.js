'use strict';
var express = require('express');
var http = require('http');
var app = module.exports = express.Router();
var generator = require('generate-password');
var Question = require('../models/question.js');
var elasticsearch = require('elasticsearch');
var errorHandler = require('errorhandler');
var client = elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

//get date with format dd/MM/yyyy
function getStringDate() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    curr_month++;
    var curr_year = d.getFullYear();
    return curr_date + '/' + curr_month + '/' + curr_year;
    }

//GET QUESTIONS BY ID PATHOLOGY - APP
app.get('/pathologies/:idPath', function (req, res) {
    //console.log('++++++++++++++++++++++++++++++++++');
    var id = req.params.idPath;
    //console.log(id);
    var indexName = 'questionscatalog';
    var typeName = 'questions';
    client.search({
        index: indexName,
        type: typeName,
        q: 'idPath:' + id
    }).then(function (resp) {
        console.log(resp.hits.hits);
        //console.log('---------------------------------');
        var hits = {};
        for (var oneCatalog of resp.hits.hits) {
            hits = oneCatalog._source;
            break;
        }
        res.status(200).json(hits);
    }, function (err) {
        console.trace(err.message);
    });
    //console.log('XXXXXXXXXXXXXX');
});


//GET PROFIL PATIENT BY ID - APP - LOGIN
app.get('/profilpatients/:idPatient', function (req, res) {
    //console.log('++++++++++++++++++++++++++++++++++');
    var id = req.params.idPatient;
    //console.log('id is ' + id);
    var indexName = 'profilcatalog';
    var typeName = 'profilpatient';
    client.search({
        index: indexName,
        type: typeName,
        q: 'id:' + id
    }).then(function (resp) {
        //console.log(resp.hits.hits);
        //console.log('---------------------------------');
        var hits = {};
        for (var oneCatalog of resp.hits.hits) {
            hits = oneCatalog._source;
            break;
        }
        res.status(200).json(hits);
    }, function (err) {
        console.trace(err.message);
    });
    //console.log('XXXXXXXXXXXXXX');
});

//GET RESPONSES - medecin
app.get('/patientresponses/:idPatient', function (req, res) {
    //console.log('++++++++++++++++++++++++++++++++++');
    var idPatient = req.params.idPatient;
    //console.log('id is ' + idPatient);
    var indexName = 'responsecatalog';
    var typeName = 'response';
    client.search({
        index: indexName,
        type: typeName,
        q: '_id:' + idPatient
    }).then(function (resp) {
        console.log(resp);
        var hits = {};
        for (var oneCatalog of resp.hits.hits) {
            hits = oneCatalog._source;
            break;
        }
        res.status(200).json(hits);
    }, function (err) {
        //console.trace(err.message);
    });
});




//send response to server - APP
app.post('/responses', function (req, res) {
    var indexName = 'responsecatalog';
    var typeName = 'response';
    console.log('request body is ');
    console.log(req.body);
    updateData();

    function updateData() {
        client.update({
            index: indexName,
            type: typeName,
            id: req.body.idPatient,
            body: {
                // put the partial document under the `doc` key
                doc: addDate(req.body),
                /* script: {
                     inline: "ctx._source.remove('field')",
                 },*/
            },
        }, function (error, response) {
            if (error) {
                errorHandler(error);
            } else {
                //console.log(response);
            }
        });
    }

    function addDate(data) {
        var key = 'response ' + getStringDate();
        var x = {
            [key]: data,
        };
        return x;
    }

    res.status(201).send({
        "msg": "Success!"
    });

});

//update googlefit - APP
app.post('/ggfit', function (req, res) {
    var indexName = 'responsecatalog';
    var typeName = 'response';

    updateData();

    function updateData() {
        client.update({
            index: indexName,
            type: typeName,
            id: req.body.id,
            body: {
                // put the partial document under the `doc` key
                doc: {
                    googlefit: req.body
                }
            }
        }, function (error, response) {
            if (error) {
                errorHandler(error);
            } else {
                console.log(response);
            }
        });
    }
    res.status(201).send({
        "msg": "Success!"
    });
});

