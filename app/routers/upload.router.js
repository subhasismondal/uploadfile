module.exports = function(app){
	const studynotes = require("../controllers/studynotes.controller");
	const upload = require('../config/upload.config');
	const uploadca = require('../config/ca.config');
	const fileWorker = require('../controllers/upload.controller.js');
	const caworker = require('../controllers/ca.controller.js');
	const qa = require('../controllers/quiz.controller.js');

	app.post('/api/uploadfile', upload.single("photo"), fileWorker.upload);
	app.get('/api/allnotes', fileWorker.findAll);

	app.post('/api/uploadcas', uploadca.single("photo"), caworker.uploadca);
	app.get('/api/allcas', caworker.findAll);

	app.post("/api/createqa", qa.create);
  app.get("/api/allqa", qa.findAll);

	app.post("/api/studynotes", studynotes.create);

    // Retrieve all Tutorials
    app.get("/api/studynotes", studynotes.findAll);

    // Retrieve all published Tutorials
    app.get("/published", studynotes.findAllPublished);

    // Retrieve a single Tutorial with id
    app.get("/:id", studynotes.findOne);

    // Update a Tutorial with id
    app.put("/:id", studynotes.update);

    // Delete a Tutorial with id
    app.delete("/:id", studynotes.delete);
}
