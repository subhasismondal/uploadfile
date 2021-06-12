module.exports = (sequelize, Sequelize) => {
    const Studynotes = sequelize.define("studynotes", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Studynotes;
  };