const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.images = require('../models/image.models')(sequelize, Sequelize);
db.studynotes = require('../models/studynotes.model')(sequelize, Sequelize);
db.ca = require('../models/ca.model')(sequelize, Sequelize);
db.quiz = require('../models/quiz.model')(sequelize, Sequelize);

module.exports = db;
