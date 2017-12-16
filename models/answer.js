module.exports = function(sequelize, Sequelize) {
  var Answer = sequelize.define("Answer", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    answers: {
      type: Sequelize.STRING,
      allowNull: false,
      len: [1, 15]
    }
    },{
    timestamps: false
  
  });

  return Answer;
};
