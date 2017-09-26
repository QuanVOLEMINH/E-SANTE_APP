export const QUESTIONS_DATA = {
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
            value: "homme",
          },
          {
            disabled: true,
            label: "Femme",
            value: "femme"
          },
        ],
        answer: ""
      },
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
            value: "oui",
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
            value: "oui",
          },
          {
            label: "Non",
            value: "non"
          }
        ],
        answer: ""
      },
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
            value: "oui",
          },
          {
            label: "Non",
            value: "non"
          }
        ],
        answer: ""
      },
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
      },
    }
  }
};
