var express = require('express');
var http = require('http');
var app = module.exports = express.Router();

var Question = require('./models/question.js');
var elasticsearch = require('elasticsearch');
var errorHandler = require('errorhandler');
var client = elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info',
  });

//GET BY ID
app.get('/patients/:idPatient', function (req, res) {
  console.log('++++++++++++++++++++++++++++++++++');
  var id = req.params.idPatient;
  var indexName = 'patientcatalog';
  client.search({
    index: indexName,
    type: 'patients',
    q: 'idPatient:' + id,
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

    client.indices.exists({index: indexName}, function (err, resp) {
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
            id: req.body.id,
            body: req.body
        }, function (error, response) {
            console.log(error);
            console.log(response);
        });
    }
    res.status(201).send({"msg": "Success! New question has been created"});

    });

    //googlefit
    app.post('/ggfit', function (req,  res) {
        console.log('req of gg fit \n:');
        console.log(req.body);
        /*this.x = req.body;
        delete this.x.id;
        console.log(this.x);
    */
        client.update({
            index: 'responsescatalog',
            type: 'responses',
            id: req.body.id,
            body: {
                // put the partial document under the `doc` key
                doc:
                {
                    googlefit: req.body
                }
            }
        }, function (error, response) {
            if (error){
                errorHandler(error);
            }
            else{
                //console.log(response);
            }
        });

        /*console.log("body ggfit");
        console.dir(req.body);
        var indexName = 'ggfitres';

        client.indices.exists({index: indexName}, function (err, resp) {
        if (err) {
        errorHandler(err);
    } else {
    if (resp) {
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
    console.log(req.body.id);
    console.log('ZZZZZZZZZZZZZZZZZZZZZ');
    client.index({
    index: 'ggfitres',
    type: 'res',
    id: req.body.id,
    body: req.body
    }, function (error, response) {
    console.log(error);
    console.log(response);
    });
    }
    */
    res.status(201).send({"msg": "Success! New question has been created"});

    });
