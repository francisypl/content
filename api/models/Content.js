
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Content', {
    content_address: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    url: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    price: {
      type: DataTypes.INTEGER(11),
      defaultValue: 0
    }
  }, {
    freezeTableName: true,
  });
};
