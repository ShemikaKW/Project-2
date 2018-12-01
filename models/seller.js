module.exports = function(sequelize, DataTypes) {
  var Seller = sequelize.define("Seller", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Seller.associate = function(models) {
    models.Seller.hasMany(models.Item);
  };

  return Seller;
};
