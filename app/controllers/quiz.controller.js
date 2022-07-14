const db = require("../config/db.config");
const Quiz = db.quiz;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
 exports.create = (req, res) => {
  // Validate request
  if (!req.body.question) {
    res.status(400).send({
      message: "Quiz can not be empty!"
    });
    return;
  }



  // Create a Tutorial
  const quizs = {
    question: req.body.question,
    answer: req.body.answer,
    explanation: req.body.explanation,
  };

  // Save Tutorial in the database
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

// Retrieve all Tutorials from the database.
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
