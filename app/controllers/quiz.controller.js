const db = require("../config/db.config");
const Quiz = db.quiz;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
  if (!req.body.question) {
    res.status(400).send({
      message: "Quiz can not be empty!"
    });
    return;
  }

  const quizs = {
    question: req.body.question,
    answer: req.body.answer,
    explanation: req.body.explanation,
  };

  Quiz.create(quizs)
    .then(data => {
      //res.send(data);
      res.status(201).json({
        message: "Quiz registered successfully!",
        data
      })

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Quiz."
      });
    });
};

exports.findAll = (req, res) => {
  const question = req.query.question;
  var condition = question ? { question: { [Op.like]: `%${question}%` } } : null;

  Quiz.findAll({ order: [['updatedAt', 'DESC']] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Quizs."
      });
    });
};
