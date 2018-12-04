module.exports = function(sequelize, DataTypes) {
  var Seller = sequelize.define("Seller", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Seller.associate = function(models) {
    models.Seller.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };

  return Seller;
};
