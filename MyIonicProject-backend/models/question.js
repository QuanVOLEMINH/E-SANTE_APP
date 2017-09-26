var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    _userId: Schema.Types.ObjectId,
    info: {
        legend: String,
        questions: {
            nom: {
                label: String,
                maxlength: Number,
                placeholder: String,
                type: {type: String},
                answer: String
            },
            age: {
                label: String,
                maxlength: Number,
                placeholder: String,
                type: {type: String},
                answer: String
            },
            sexe: {
                label: String,
                maxlength: Number,
                placeholder: String,
                type: {type: String},
                options: [
                    {
                        label: String,
                        value: String
                    },
                    {
                        disabled: Boolean,
                        label: String,
                        value: String
                    }
                ],
                answer: String
            }
        }
    },
    comportement: {
        legend: String,
        questions: {
            tabac: {
                label: String,
                maxlength: Number,
                placeholder: String,
                type: {type: String},
                options: [
                    {
                        label: String,
                        value: String
                    },
                    {
                        label: String,
                        value: String
                    }
                ],
                answer: String
            },
            ageFumer: {
                label: String,
                maxlength: Number,
                placeholder: String,
                type: {type: String},
                answer: String
            },
            consommeTabac: {
                label: String,
                maxlength: Number,
                placeholder: String,
                type: {type: String},
                options: [
                    {
                        label: String,
                        value: String
                    },
                    {
                        label: String,
                        value: String
                    }
                ],
                answer: String
            }
        }
    },
    physique: {
        legend: String,
        questions: {
            taille: {
                label: String,
                maxlength: Number,
                placeholder: String,
                type: {type: String},
                answer: String
            },
            poid: {
                label: String,
                maxlength: Number,
                placeholder: String,
                type: {type: String},
                answer: String
            },
            enceinte: {
                label: String,
                maxlength: Number,
                placeholder: String,
                type: {type: String},
                options: [
                    {
                        label: String,
                        value: String
                    },
                    {
                        label: String,
                        value: String
                    }
                ],
                answer: String
            }
        }
    },
    biochimie: {
        legend: String,
        questions: {
            glycemie: {

                label: String,
                maxlength: Number,
                placeholder: String,
                type: {type: String},
                answer: String
            },
            cholesterol: {
                label: String,
                maxlength: Number,
                placeholder: String,
                type: {type: String},
                answer: String
            },
            triglycerides: {
                label: String,
                maxlength: Number,
                placeholder: String,
                type: {type: String},
                answer: String
            }
        }
    }
});

QuestionSchema.pre('save', function(next) {
    var question = this;
    next();
});

module.exports = mongoose.model('Question', QuestionSchema);