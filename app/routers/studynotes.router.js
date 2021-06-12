module.exports = app => {
    const studynotes = require("../controllers/studynotes.controller");
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", studynotes.create);
  
    // Retrieve all Tutorials
    router.get("/", studynotes.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", studynotes.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", studynotes.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", studynotes.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", studynotes.delete);
  
    // Delete all Tutorials
    router.delete("/", studynotes.deleteAll);
  
    app.use('/api/studynotes', router);
  };
  