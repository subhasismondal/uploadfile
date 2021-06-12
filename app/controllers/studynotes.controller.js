const db = require("../config/db.config");
const Studynotes = db.studynotes;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
 exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  

  // Create a Tutorial
  const studynotes = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Studynotes.create(studynotes)
    .then(data => {
      //res.send(data);
      res.status(201).json({
        message: "Note registered successfully!",
        data
      })
     
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Notes."
      });
    });
};
/*
exports.create = (req, res) => {
 
 const studynotes = {
    title: req.title,
    description: req.description,
    published: req.published ? req.published : false
  };

  Studynotes.create(studynotes)
    .then(data => {
      console.log('i am inside controller');
      console.log(data);
      res.status(201).json({
        message: "Note registered successfully!",
        noteCreated: {
          title: data.title,
        }
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Notes."
      });
    });
}
*/
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Studynotes.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Studynotes."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Studynotes.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Studynotes with id=" + id
      });
    });
};


// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Studynotes.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "StudyNotes was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update StudyNotes with id=${id}. Maybe StudyNotes was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating StudyNotes with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Studynotes.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "StudyNotes was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete StudyNotes with id=${id}. Maybe StudyNotes was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete StudyNotes with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Studynotes.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} StudyNotes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Studynotes.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving StudyNotes."
      });
    });
};
