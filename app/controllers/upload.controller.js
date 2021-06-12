const fs = require('fs');

const db = require('../config/db.config');
const Image = db.images;
 
// Upload a Multipart-File then saving it to MySQL database
exports.upload = (req, res) => {	
	Image.create({
		title: req.body.title,
		description: req.body.title,
		postdate : req.body.postdate,
		//photo : req.file.path,
		type: req.file.mimetype,
		photo: req.file.originalname,
		path: 'http://localhost:8081/'+req.file.originalname,
		//data: fs.readFileSync(__basedir + '/resources/static/assets/uploads/' + req.file.filename)
	}).then(image => {
		try{
			//fs.writeFileSync(__basedir + '/resources/static/assets/tmp/' + image.name);		
			
			// exit node.js app
			res.json({'msg': 'File uploaded successfully!', 'file': req.file});
		}catch(e){
			console.log(e);
			res.json({'err': e});
		}
	})
};

/* find all notes */

exports.findAll = (req, res) => {
	//const title = req.query.title;
	//var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
	Image.findAll()
	  .then(data => {
		data.photo
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving Studynotes."
		});
	  });
  };