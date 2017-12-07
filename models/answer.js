
module.exports = function(sequelize, Sequelize) {
  var Answer = sequelize.define("Answer", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      len: [1, 15]
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
      len: [1, 50]
    },{
    timestamps: false
  
  });

  return Answer;
};

a
sdfasdfsadfasdf