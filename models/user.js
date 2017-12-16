
module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      len: [1, 15]
    }
  },{
    timestamps: false
  });

  return User;
};