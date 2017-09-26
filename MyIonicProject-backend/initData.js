var elasticsearch = require('elasticsearch');

var indexName = 'questionscatalog';


var client = elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

client.ping({
    requestTimeout: 30000
}, function (err) {
    if (err) {
        errorHandler(err);
    } else {
        console.log('All is well');
    }
});

client.indices.exists({
    index: indexName
}, function (err, resp) {
    if (err) {
        errorHandler(err);
    } else {
        if (resp) {
            client.indices.delete({
                index: indexName
            }, function (err2, resp) {
                if (err2) {
                    errorHandler(err2);
                } else {
                    createIndex();
                }
            });
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
        }
    });
}

function createData() {
    client.create({
        index: 'questionscatalog',
        type: 'questions',
        id: 1,
        body: {
            info: {
                legend: "INFORMATIONS DEMOGRAPHIQUES",
                questions: {
                    nom: {
                        label: "Nom",
                        maxlength: 51,
                        placeholder: "Remplissez votre nom",
                        type: "Input",
                        answer: ""
                    },
                    age: {
                        label: "Age",
                        maxlength: 10,
                        placeholder: "Remplissez votre âge",
                        type: "Input",
                        answer: ""
                    },
                    sexe: {
                        label: "Sexe",
                        maxlength: 0,
                        placeholder: "",
                        type: "Select",
                        options: [
                            {
                                label: "Homme",
                                value: "homme"
                            },
                            {
                                disabled: true,
                                label: "Femme",
                                value: "femme"
                            }
                        ],
                        answer: ""
                    }
                }
            },
            comportement: {
                legend: "MESURES COMPORTEMENTALES",
                questions: {
                    tabac: {
                        label: "Fumez-vous des produits à base de tabac?",
                        maxlength: 51,
                        placeholder: "",
                        type: "Radio",
                        options: [
                            {
                                label: "Oui",
                                value: "oui"
                            },
                            {
                                label: "Non",
                                value: "non"
                            }
                        ],
                        answer: ""
                    },
                    ageFumer: {
                        label: "Age",
                        maxlength: 10,
                        placeholder: "",
                        type: "Input",
                        answer: ""
                    },
                    consommeTabac: {
                        label: "Dans le passé, avez-vous fumé?",
                        maxlength: 0,
                        placeholder: "",
                        type: "Radio",
                        options: [
                            {
                                label: "Oui",
                                value: "oui"
                            },
                            {
                                label: "Non",
                                value: "non"
                            }
                        ],
                        answer: ""
                    }
                }
            },
            physique: {
                legend: "MESURES PHYSIQUES",
                questions: {
                    taille: {
                        label: "Taille",
                        maxlength: 10,
                        placeholder: "",
                        type: "Input",
                        answer: ""
                    },
                    poid: {
                        label: "Poid",
                        maxlength: 10,
                        placeholder: "",
                        type: "Input",
                        answer: ""
                    },
                    enceinte: {
                        label: "Êtes-vous enceinte?",
                        maxlength: 0,
                        placeholder: "",
                        type: "Radio",
                        options: [
                            {
                                label: "Oui",
                                value: "oui"
                            },
                            {
                                label: "Non",
                                value: "non"
                            }
                        ],
                        answer: ""
                    }
                }
            },
            biochimie: {
                legend: "MESURES BIOCHIMIQUES",
                questions: {
                    glycemie: {
                        label: "Glycémie à jeun",
                        maxlength: 10,
                        placeholder: "mg/l",
                        type: "Input",
                        answer: ""
                    },
                    cholesterol: {
                        label: "Cholestérol total",
                        maxlength: 10,
                        placeholder: "mg/l",
                        type: "Input",
                        answer: ""
                    },
                    triglycerides: {
                        label: "Triglycérides",
                        maxlength: 10,
                        placeholder: "mg/l",
                        type: "Input",
                        answer: ""
                    }
                }
            }
        }
    }, function (error, response) {
        console.log(error);
        console.log(response);
    });

}

function errorHandler(err) {
    console.error('elasticsearch cluster has error: ' + err);
    console.error('Exit here!');
    process.exit();
}
