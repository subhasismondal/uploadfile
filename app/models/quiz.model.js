module.exports = (sequelize, Sequelize) => {
    const Quiz = sequelize.define("quiz", {
      question: {
        type: Sequelize.STRING
      },
       answer: {
        type: Sequelize.STRING
      },
      explanation: {
        type: Sequelize.STRING
      }
    });

    return Quiz;
  };
