var express = require('express');
var http = require('http');
var app = module.exports = express.Router();

var Question = require('./models/question.js');
var elasticsearch = require('elasticsearch');
var errorHandler = require('errorhandler');
var client = elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

//GET
/*app.get('/questions', function (req, res) {
    /!*Question.find({}, function (err, questions) {
        if (err) {
            return res.json({"msg": "Error while retrieving questions", "error": err});
        }
        res.status(200).send(console.log("Success"));
    });*!/
    var indexName = 'patientcatalog'
    client.search({
        index: indexName,
        type: 'patients'
    }).then(function (resp) {
        console.log(resp.hits.hits);
        console.log('---------------------------------');
        var hits = {};
        for (var oneCatalog of resp.hits.hits) {
            hits = oneCatalog._source;
            break;
        }
        res.status(200).json(hits);
    }, function (err) {
        console.trace(err.message);
    });
    console.log('XXXXXXXXXXXXXX');
});*/

//GET BY ID
app.get('/patients/:idPatient', function (req, res) {
    /*Question.find({}, function (err, questions) {
        if (err) {
            return res.json({"msg": "Error while retrieving questions", "error": err});
        }
        res.status(200).send(console.log("Success"));
    });*/
    console.log('++++++++++++++++++++++++++++++++++');
    var id = req.params.idPatient;
    var indexName = 'patientcatalog';
    client.search({
        index: indexName,
        type: 'patients',
        q: "idPatient:" + id
    }).then(function (resp) {
        console.log(resp.hits.hits);
        console.log('---------------------------------');
        var hits = {};
        for (var oneCatalog of resp.hits.hits) {
            hits = oneCatalog._source;
            break;
        }
        res.status(200).json(hits);
    }, function (err) {
        console.trace(err.message);
    });
    console.log('XXXXXXXXXXXXXX');
});

//POST
app.post('/responses', function (req,  res) {
    /*var newQuestion = new Question({
        info: req.body.info,
        comportement: req.body.comportement,
        physique: req.body.physique,
        biochimie: req.body.biochimie
    });
    newQuestion.save(function (err) {
        if (err) {
            console.log("Error: ", err);
            return res.json({"msg": "Error while creating Todo", "error": err});
        }
        res.status(201).send({"msg": "Success! New question has been created"})
    });*/
    var indexName = 'responsescatalog';
    client.indices.exists({
        index: indexName
    }, function (err, resp) {
        if (err) {
            errorHandler(err);
        } else {
            if (resp) {
                /*client.indices.delete({
                    index: indexName
                }, function (err2, resp) {
                    if (err2) {
                        errorHandler(err2);
                    } else {
                        console.log('Delete!');
                        createIndex();
                    }
                });*/
                console.log('createData');
                createData();
                console.log(req.body);
            } else {
                createIndex();
            }
        }
    });

    function createIndex() {
        console.log('createIndex');
        client.indices.create({
            index: indexName
        }, function (err, resp) {
            if (err) {
                errorHandler(err);
            } else {
                createData();
                console.log('createData');
            }
        });
    }

    function createData() {
        console.log('createData');
        console.log('YYYYYYYYYYYYYYYYYYYY');
        console.log(req.body);
        console.log('ZZZZZZZZZZZZZZZZZZZZZ');
        client.index({
            index: 'responsescatalog',
            type: 'responses',
            body: req.body
        }, function (error, response) {
            console.log(error);
            console.log(response);
        });
    }
    res.status(201).send({"msg": "Success! New question has been created"});
});
