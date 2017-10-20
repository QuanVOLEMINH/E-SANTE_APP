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
        console.log('All is good');
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
                                    label: "Femme",
                                    value: "femme"
                                }
                            ],
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
                        },
                        dateDeNaissance: {
                            label: "Date de naissance",
                            inline: false,
                            placeholder: "",
                            type: "DateTime",
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
                        },
                        age: {
                            label: "Age",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                maxLength: 3,
                                pattern: "^(0?[1-9]|[1-9][0-9]|[1][0-4][0-9]|150)$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés et {{label}} < 150"
                            }
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
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
                        },
                        ageFumer: {
                            label: "Age",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                maxLength: 3,
                                pattern: "^(0?[1-9]|[1-9][0-9]|[1][0-4][0-9]|150)$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés et {{label}} < 150"
                            }
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
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
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
                            answer: "",
                            validators: {
                                required: null,
                                maxLength: 3,
                                pattern: "^(0?[1-9]|[1-9][0-9]|[1][0-9][0-9]|[2][0-4][0-9]|250)$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés et {{label}} < 250"
                            }
                        },
                        poid: {
                            label: "Poid",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                pattern: "^\\d+(\\,\\d{1,2})?$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés"
                            }
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
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
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
                            answer: "",
                            validators: {
                                required: null,
                                pattern: "^\\d+(\\,\\d{1,2})?$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés"
                            }
                        },
                        cholesterol: {
                            label: "Cholestérol total",
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                pattern: "^\\d+(\\,\\d{1,2})?$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés"
                            }
                        },
                        triglycerides: {
                            label: "Triglycérides",
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                pattern: "^\\d+(\\,\\d{1,2})?$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés"
                            }
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
                                    label: "Femme",
                                    value: "femme"
                                }
                            ],
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
                        },
                        dateDeNaissance: {
                            label: "Date de naissance",
                            inline: false,
                            placeholder: "",
                            type: "DateTime",
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
                        },
                            /*validators: {
                                customValidator: null,
                                minLength: 5,
                                maxLength: 10
                            },
                            errorMessages: {
                                required: "{{ label }} is required",
                                maxLength: "Max character count is 5"
                            }
                        },*/
                        age: {
                            label: "Age",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                maxLength: 3,
                                pattern: "^(0?[1-9]|[1-9][0-9]|[1][0-4][0-9]|150)$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés et {{label}} < 150"
                            }
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
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
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
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
                        }
                    }
                },
                maladie: {
                    legend: "MALADIE",
                    questions: {
                        ageDiabete: {
                            label: "A quel âge avez-vous été diagnostiquer diabétique?",
                            maxLength: 10,
                            placeholder: "Age",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                maxLength: 3,
                                pattern: "^(0?[1-9]|[1-9][0-9]|[1][0-4][0-9]|150)$"
                            },
                            errorMessages: {
                                required: "{{placeholder}} is required.",
                                pattern: "Seuls des chiffres sont autorisés et {{placeholder}} < 150"
                            }
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
                            answer: "",
                            validators: {
                                required: null
                            }
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
                            answer: "",
                            validators: {
                                required: null
                            }
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
                            answer: "",
                            validators: {
                                required: null,
                                maxLength: 3,
                                pattern: "^(0?[1-9]|[1-9][0-9]|[1][0-9][0-9]|[2][0-4][0-9]|250)$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés et {{label}} < 250"
                            }
                        },
                        poid: {
                            label: "Votre poids",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                pattern: "^\\d+(\\,\\d{1,2})?$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés"
                            }
                        },
                        exercices: {
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
                            answer: "",
                            validators: {
                                required: null
                            }
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
                            answer: "",
                            validators: {
                                required: null,
                                pattern: "^\\d+(\\,\\d{1,2})?$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés"
                            }
                        },
                        cholesterol: {
                            label: "Cholestérol HDL",
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                pattern: "^\\d+(\\,\\d{1,2})?$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés"
                            }
                        },
                        triglycerides: {
                            label: "Triglycérides",
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                pattern: "^\\d+(\\,\\d{1,2})?$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés"
                            }
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
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
                        },
                        dateDeNaissance: {
                            label: "Date de naissance",
                            inline: false,
                            placeholder: "",
                            type: "DateTime",
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
                        },
                            /*validators: {
                                customValidator: null,
                                minLength: 5,
                                maxLength: 10
                            },
                            errorMessages: {
                                required: "{{ label }} is required",
                                maxLength: "Max character count is 5"
                            }*/

                        age: {
                            label: "Age",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                maxLength: 3,
                                pattern: "^(0?[1-9]|[1-9][0-9]|[1][0-4][0-9]|150)$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés et {{label}} < 150"
                            }
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
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
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
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
                        }
                    }
                },
                maladie: {
                    legend: "MALADIE",
                    questions: {
                        ageEpileptique: {
                            label: "A quel âge avez-vous été diagnostiquer epileptique?",
                            maxLength: 10,
                            placeholder: "Age",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                maxLength: 3,
                                pattern: "^(0?[1-9]|[1-9][0-9]|[1][0-4][0-9]|150)$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés et {{placeholder}} < 150"
                            }
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
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
                        },
                        freqCrises: {
                            label: "Fréquence des crises (mois)",
                            min: 1,
                            max: 12,
                            type: "Range",
                            answer: "",
                            validators: {
                                required: null,
                                maxLength: 3,
                                pattern: "^(0?[1-9]|[1][0-2]|12)$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés et {{label}} < 12"
                            }
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
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
                        },
                        invalidite: {
                            label: "Etes vous en invalidité?",
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
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
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
                            answer: "",
                            validators: {
                                required: null,
                                maxLength: 3,
                                pattern: "^(0?[1-9]|[1-9][0-9]|[1][0-9][0-9]|[2][0-4][0-9]|250)$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés et {{label}} < 250"
                            }
                        },
                        poid: {
                            label: "Votre poids",
                            maxLength: 10,
                            placeholder: "",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                pattern: "^\\d+(\\,\\d{1,2})?$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés"
                            }
                        },
                        exercices: {
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
                            answer: "",
                            validators: {
                                required: null
                            },
                            errorMessages: {
                                required: "{{label}} is required."
                            }
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
                            answer: "",
                            validators: {
                                required: null,
                                pattern: "^\\d+(\\,\\d{1,2})?$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés"
                            }
                        },
                        cholesterol: {
                            label: "Cholestérol HDL",
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                pattern: "^\\d+(\\,\\d{1,2})?$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés"
                            }
                        },
                        triglycerides: {
                            label: "Triglycérides",
                            maxLength: 10,
                            placeholder: "mg/l",
                            type: "Input",
                            answer: "",
                            validators: {
                                required: null,
                                pattern: "^\\d+(\\,\\d{1,2})?$"
                            },
                            errorMessages: {
                                required: "{{label}} is required",
                                pattern: "Seuls des chiffres sont autorisés"
                            }
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
