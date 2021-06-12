var express = require('express');
var cors = require("cors");
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
global.__basedir = __dirname;
app.use(express.static(__dirname + '/resources/static/assets/uploads/'));
app.use(function (req, res, next) {


  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');


  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
 
const db = require('./app/config/db.config');

app.use(cors({origin: 'http://localhost:8080'}));
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: false }');
}); 

require('./app/routers/upload.router.js')(app);

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'frontend-angular/dist/Angular8UploadFile/index.html'));
})

// Create a Server
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
 
})

