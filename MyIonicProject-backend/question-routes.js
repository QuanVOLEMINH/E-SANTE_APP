var express = require('express');
var http = require('http');
var app = module.exports = express.Router();
var generator = require('generate-password');
var Question = require('./models/question.js');
var elasticsearch = require('elasticsearch');
var errorHandler = require('errorhandler');
var client = elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info',
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

//GET QUESTIONS BY ID PATHOLOGY
app.get('/pathologies/:idPath', function (req, res) {
    //console.log('++++++++++++++++++++++++++++++++++');
    var id = req.params.idPath;
    //console.log(id);
    var indexName = 'questionscatalog';
    var typeName = 'questions';
    client.search({
        index: indexName,
        type: typeName,
        q: 'idPath:' + id,
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

//GET PROFIL PATIENT BY ID
app.get('/profilpatients/:idPatient', function (req, res) {
    //console.log('++++++++++++++++++++++++++++++++++');
    var id = req.params.idPatient;
    //console.log('id is ' + id);
    var indexName = 'profilcatalog';
    client.search({
        index: indexName,
        type: 'profilpatient',
        q: 'id:' + id,
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

//GET RESPONSES     
app.get('/patientresponses/:idPatient', function (req, res) {
    //console.log('++++++++++++++++++++++++++++++++++');
    var idPatient = req.params.idPatient;
    //console.log('id is ' + idPatient);
    var indexName = 'responsecatalog';
    var typeName = 'response';
    client.search({
        index: indexName,
        type: typeName,
        q: '_id:' + idPatient,
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

//initialize profil + response
app.post('/profilPatient', function (req, res) {
    var indexName = 'profilcatalog';
    var indexName2 = 'responsecatalog';
    var typeName = 'profilpatient';
    var typeName2 = 'response';

    client.indices.exists({
        index: indexName
    }, function (err, resp) {
        if (err) {
            errorHandler(err);
        } else {
            if (resp) {
                //console.log('createData');
                createData(indexName, typeName);
                //console.log(req.body);
            } else {
                createIndex(indexName);
            }
        }
    });

    client.indices.exists({
        index: indexName2
    }, function (err, resp) {
        if (err) {
            errorHandler(err);
        } else {
            if (resp) {
                console.log('createDataResponses');
                createDataResponses(indexName2, typeName2);
                console.log(req.body);
            } else {
                createIndexResponses(indexName2);
            }
        }
    });

    function createIndex(index) {
        console.log('createIndex');
        client.indices.create({
            index: index
        }, function (err, resp) {
            if (err) {
                errorHandler(err);
            } else {
                createData(indexName, typeName);
                console.log('createData');
            }
        });
    }

    function createData(index, type) {
        console.log(index + '------' + type);
        console.log('YYYYYYYYYYYYYYYYYYYY');
        console.log(req.body);
        console.log('ZZZZZZZZZZZZZZZZZZZZZ');
        client.index({
            index: index,
            type: type,
            id: req.body.id,
            body: req.body
        }, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log(response);
                console.log('Generate password!!!!!!!!!!!');
                //Generator Password for User
                var password = generator.generate({
                    length: 10,
                    numbers: true
                });
                console.log('Create password!!!!!!!!!!!');
                client.update({
                    index: index,
                    type: type,
                    id: req.body.id,
                    body: {
                        //Add pass to user's profile
                        doc: {
                            password: password
                        }
                    }
                }, function (error, response) {
                    if (error) {
                        errorHandler(error);
                    } else {
                        console.log(response);
                    }
                });
                console.log('-_-___-_----_-');
            }
        });
    }

    //initialize response
    function createIndexResponses(index) {
        console.log('createIndexResponses');
        client.indices.create({
            index: index
        }, function (err, resp) {
            if (err) {
                errorHandler(err);
            } else {
                createDataResponses(indexName2, typeName2);
                console.log('createData');
            }
        });
    }

    function createDataResponses(index, type) {
        console.log(index + '------' + type);
        console.log('YYYYYYYYYYYYYYYYYYYY');
        //console.log(req.body);
        console.log('ZZZZZZZZZZZZZZZZZZZZZ');
        client.index({
            index: index,
            type: type,
            id: req.body.id,
            body: {}
        }, function (error, response) {
            console.log(error);
            console.log(response);
        });
    }

    res.status(201).send({
        "msg": 'Success! New information has been created'
    });

});

//send response to server
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
        return x = {
            [key]: data,
        };
    }

    res.status(201).send({
        "msg": "Success!"
    });

});

//update googlefit
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
                    googlefit: req.body,
                }
            }
        }, function (error, response) {
            if (error) {
                errorHandler(error);
            } else {
                //console.log(response);
            }
        });
    }
    res.status(201).send({
        "msg": "Success!"
    });
});