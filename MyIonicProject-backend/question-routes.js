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
//Module sending mail automatically
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var events = require('events');
var check = 1;
var events = new events.EventEmitter();
var transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    pool: true,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'dinhhuypfiev@gmail.com',
        pass: 'V9FGKQ3B'
    },
    proxy: 'http://localhost:3001/'
}));

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
//GET LIST PATIENTS
app.get('/profilPatient', function (req, res) {
    //console.log('++++++++++++++++++++++++++++++++++');
    //var id = req.params.idPatient;
    var indexName = 'profilcatalog';
    client.search({
        index: indexName,
        type: 'profilpatient',
        size: 50
        // q: 'idPatient:' + id
    }).then(function (resp) {
        //console.log(resp.hits.hits);
        //console.log('---------------------------------');
        var hits = {};
        for (var oneCatalog of resp.hits.hits) {
            hits = oneCatalog._source;
            break;
        }

        res.status(200).json(resp.hits.hits);
    }, function (err) {
        console.trace(err.message);
    });
    //console.log('XXXXXXXXXXXXXX');
});


app.get('/profilPatient/:id', function (req, res) {
    //console.log('++++++++++++++++++++++++++++++++++');
    //console.log(req.params.id);
    var id = req.params.id;
    var indexName = 'profilcatalog';
    var typeName = 'profilpatient';
    client.get({
        index: indexName,
        type: typeName,
        id: id
    }, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
            res.status(200).json(response);
        }
    });
    console.log('Successsssss');
});

//GET PROFIL PATIENT BY ID
app.get('/profilpatients/:idPatient', function (req, res) {
    //console.log('++++++++++++++++++++++++++++++++++');
    var id = req.params.idPatient;
    //console.log('id is ' + id);
    var indexName = 'profilcatalog';
    var typeName = 'profilpatient';
    client.search({
        index: indexName,
        type: typeName,
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
    client.indices.exists({index: indexName}, function (err, resp) {
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

    client.indices.exists({index: indexName2}, function (err, resp) {
        if (err) {
            errorHandler(err);
        } else {
            if (resp) {
                console.log('createDataResponses');
                createDataResponses(indexName2, typeName2);
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
        //console.log(req.body);
        console.log('ZZZZZZZZZZZZZZZZZZZZZ');
        client.index({
            index: index,
            type: type,
            id: req.body.id,
            body: req.body
        }, function (error, response) {
            if (error) {
                console.log(error);
            }
            else {
                //console.log(response);
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
                        //send();
                        var content = 'ID: ' + req.body.id + '\nPassword: ' + password;
                        /*transporter.sendMail(inputmail(req.body.email, content), function (err, success) {
                            if (err) {
                                console.log(err);
                            }
                            if (success) {
                                console.log(success);
                            }
                        });*/
                        send(req.body.email, content);
                    }
                });

                console.log('-_-___-_----_-');
            }
        });
    }

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

    //method for sending email
    function inputmail(receiver, content) {
        const from = 'dinhhuypfiev@gmail.com';
        //const to = 'dinhhuypfiev@gmail.com';
        const subject = 'Application';
        /*const html = '<b>example email</b>';*/
        var mailOption = {
            from: from,
            to: receiver,
            subject: subject,
            text: content,
            //html: html,
            //for a file from a URL
            /*attachments: [
                {
                    filename: 'receipt.png',
                    path: 'http://example.com/email-receipt?id=1\&email=ex@ample.com',
                    cid: 'receipt@example.com'
                }]*/
            attachments: [
                {
                    filename: 'ver0311.apk',
                    path: 'D:/PROGRAMMING/Projects/E-SANTE_APP/ReleasedApp/ver0311.apk'
                }
            ]
        };
        return mailOption;
    }
    function send(receiver, content) {
        transporter.sendMail(inputmail(receiver, content), function (err, success) {
            if (err) {
                console.log(err);
                events.emit('error', err);
                if (check<3) {
                    send(receiver, content);
                }
            }
            if (success) {
                console.log(success);
                events.emit('success', success);
            }
        });
    }

    res.status(201).send({"msg": 'Success! New information has been created'});

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

//DELETE
//Remove a patient by his/her ID
app.delete('/profilPatient/:id', function (req, res) {
    console.log('++++++++++++++++++++++++++++++++++');
    //console.log(req.body);
    var id = req.params.id;
    console.log(id);
    var indexName = 'profilcatalog';
    var typeName = 'profilpatient';
    client.exists({
        index: indexName,
        type: typeName,
        id: id,
    }, function (error, exists) {
        console.log(exists);
        if (exists === true) {
            client.delete({
                index: indexName,
                type: typeName,
                id: id
            }, function (error, response) {
                if (error) {
                    console.log(error);
                    console.log('ERRORRRRR!!!')
                } else {
                    console.log(response);
                    console.log('Delete!!!!');
                }
            });
        } else {
            console.log('error from server ' + error);
        }
    });

    res.status(200).send({"msg": 'Deleted!!!'});
});