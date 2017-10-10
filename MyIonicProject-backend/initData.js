var elasticsearch = require('elasticsearch');

//Database: Patient
var indexName = 'patientcatalog';


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
    /*client.create({
        index: indexName,
        type: 'patients',
        id: 1,
        body: {
            info: {
                legend: "INFORMATIONS DEMOGRAPHIQUES",
                questions: {
                    nom: {
                        label: "Nom",
                        maxLength: 51,
                        placeholder: "Remplissez votre nom",
                        type: "Input",
                        answer: "",
                        validators: {
                            customValidator: null,
                            minLength: 5,
                            maxLength: 10
                        },
                        errorMessages: {
                            required: "{{ label }} is required",
                            maxLength: "Max character count is 5"
                        }
                    },
                    age: {
                        label: "Age",
                        maxLength: 10,
                        placeholder: "Remplissez votre âge",
                        type: "Input",
                        answer: ""
                    },
                    sexe: {
                        label: "Sexe",
                        maxLength: 0,
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
                        maxLength: 51,
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
                        maxLength: 10,
                        placeholder: "",
                        type: "Input",
                        answer: ""
                    },
                    consommeTabac: {
                        label: "Dans le passé, avez-vous fumé?",
                        maxLength: 0,
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
                        maxLength: 10,
                        placeholder: "",
                        type: "Input",
                        answer: ""
                    },
                    poid: {
                        label: "Poid",
                        maxLength: 10,
                        placeholder: "",
                        type: "Input",
                        answer: ""
                    },
                    enceinte: {
                        label: "Êtes-vous enceinte?",
                        maxLength: 0,
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
                        maxLength: 10,
                        placeholder: "mg/l",
                        type: "Input",
                        answer: ""
                    },
                    cholesterol: {
                        label: "Cholestérol total",
                        maxLength: 10,
                        placeholder: "mg/l",
                        type: "Input",
                        answer: ""
                    },
                    triglycerides: {
                        label: "Triglycérides",
                        maxLength: 10,
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
    });*/
    client.create({
        index: indexName,
        type: 'patients',
        id: 1,
        body: {
            idPatient: '1',
            questioncatalog: {
                info: {
                    legend: "INFORMATIONS DEMOGRAPHIQUES",
                    questions: {
                        sexe: {
                            label: "Sexe",
                            maxLength: 0,
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
                        },
                        dateDeNaissance: {
                            label: "Date de naissance",
                            maxLength: 51,
                            placeholder: "",
                            type: "Input",
                            answer: "",
                            /*validators: {
                                customValidator: null,
                                minLength: 5,
                                maxLength: 10
                            },
                            errorMessages: {
                                required: "{{ label }} is required",
                                maxLength: "Max character count is 5"
                            }*/
                        },
                        age: {
                            label: "Age",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: ""
                        }
                    }
                },
                comportement: {
                    legend: "MESURES COMPORTEMENTALES",
                    questions: {
                        tabac: {
                            label: "Fumez-vous des produits à base de tabac?",
                            maxLength: 51,
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
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: ""
                        },
                        consommeTabac: {
                            label: "Dans le passé, avez-vous fumé?",
                            maxLength: 0,
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
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: ""
                        },
                        poid: {
                            label: "Poid",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: ""
                        },
                        enceinte: {
                            label: "Êtes-vous enceinte?",
                            maxLength: 0,
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
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: ""
                        },
                        cholesterol: {
                            label: "Cholestérol total",
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: ""
                        },
                        triglycerides: {
                            label: "Triglycérides",
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: ""
                        }
                    }
                }
            }

        }
    }, function (error, response) {
        console.log(error);
        console.log(response);
    });

    client.create({
        index: indexName,
        type: 'patients',
        id: 2,
        body: {
            idPatient: '2',
            questioncatalog: {
                info: {
                    legend: "INFORMATIONS DEMOGRAPHIQUES",
                    questions: {
                        sexe: {
                            label: "Sexe",
                            maxLength: 0,
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
                        },
                        dateDeNaissance: {
                            label: "Date de naissance",
                            maxLength: 51,
                            placeholder: "",
                            type: "Input",
                            answer: "",
                            /*validators: {
                                customValidator: null,
                                minLength: 5,
                                maxLength: 10
                            },
                            errorMessages: {
                                required: "{{ label }} is required",
                                maxLength: "Max character count is 5"
                            }*/
                        },
                        age: {
                            label: "Age",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: ""
                        }
                    }
                },
                comportement: {
                    legend: "MESURES COMPORTEMENTALES",
                    questions: {
                        tabac: {
                            label: "Fumez-vous des produits à base de tabac?",
                            maxLength: 51,
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
                        consommeTabac: {
                            label: "Consommez-vous des boissons alcoolisées?",
                            maxLength: 0,
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
                maladie: {
                    legend: "MALADIE",
                    questions: {
                        ageDiabete: {
                            label: "",
                            maxLength: 10,
                            placeholder: "A quel âge avez-vous été diagnostiquer diabétique?",
                            type: "Input",
                            answer: ""
                        },
                        injectionsInsuline: {
                            label: "Etes-vous traité(e) pour le diabète par injections d'insuline?",
                            maxLength: 0,
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
                        traiteDiabete: {
                            label: "Etes-vous traité(e) pour le diabète par comprimés?",
                            maxLength: 0,
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
                    legend: "ACTIVITE PHYSIQUE",
                    questions: {
                        taille: {
                            label: "Votre taille",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: ""
                        },
                        poid: {
                            label: "Votre poids",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: ""
                        },
                        enceinte: {
                            label: "Faites vous des exercices Physiques?",
                            maxLength: 0,
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
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: ""
                        },
                        cholesterol: {
                            label: "Cholestérol HDL",
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: ""
                        },
                        triglycerides: {
                            label: "Triglycérides",
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: ""
                        }
                    }
                }
            }

        }
    }, function (error, response) {
        console.log(error);
        console.log(response);
    });

    client.create({
        index: indexName,
        type: 'patients',
        id: 3,
        body: {
            idPatient: '3',
            questioncatalog: {
                info: {
                    legend: "INFORMATIONS DEMOGRAPHIQUES",
                    questions: {
                        sexe: {
                            label: "Sexe",
                            maxLength: 0,
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
                        },
                        dateDeNaissance: {
                            label: "Date de naissance",
                            maxLength: 51,
                            placeholder: "",
                            type: "Input",
                            answer: "",
                            /*validators: {
                                customValidator: null,
                                minLength: 5,
                                maxLength: 10
                            },
                            errorMessages: {
                                required: "{{ label }} is required",
                                maxLength: "Max character count is 5"
                            }*/
                        },
                        age: {
                            label: "Age",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: ""
                        }
                    }
                },
                comportement: {
                    legend: "MESURES COMPORTEMENTALES",
                    questions: {
                        tabac: {
                            label: "Fumez-vous des produits à base de tabac?",
                            maxLength: 51,
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
                        consommeTabac: {
                            label: "Consommez-vous des boissons alcoolisées?",
                            maxLength: 0,
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
                maladie: {
                    legend: "MALADIE",
                    questions: {
                        ageEpileptique: {
                            label: "",
                            maxLength: 10,
                            placeholder: "A quel âge avez-vous été diagnostiquer epileptique?",
                            type: "Input",
                            answer: ""
                        },
                        typeEpilepsie: {
                            label: "Quel est le type de l'epilepsie?",
                            maxLength: 0,
                            placeholder: "",
                            type: "Radio",
                            options: [
                                {
                                    label: "Idiopathque",
                                    value: "idiopathque"
                                },
                                {
                                    label: "Symptomatique",
                                    value: "symptomatique"
                                },
                                {
                                    label: "Cryptogéniques",
                                    value: "cryptogéniques"
                                }
                            ],
                            answer: ""
                        },
                        freqCrises: {
                            label: "Fréquence des crises",
                            maxLength: 10,
                            placeholder: "mois",
                            type: "Input",
                            answer: ""
                        },
                        traiteEpilepsie: {
                            label: "Etes-vous traité(e) pour l'epilepsie?",
                            maxLength: 0,
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
                    legend: "ACTIVITE PHYSIQUE",
                    questions: {
                        taille: {
                            label: "Votre taille",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: ""
                        },
                        poid: {
                            label: "Votre poids",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: ""
                        },
                        enceinte: {
                            label: "Faites vous des exercices Physiques?",
                            maxLength: 0,
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
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: ""
                        },
                        cholesterol: {
                            label: "Cholestérol HDL",
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: ""
                        },
                        triglycerides: {
                            label: "Triglycérides",
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: ""
                        }
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
