module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    fileURL: DataTypes.TEXT
  });

  Item.associate = function(models) {
    models.Item.belongsTo(models.Seller, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Item;
};
