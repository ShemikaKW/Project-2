module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    image: DataTypes.TEXT("long"),
    purchased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Item.associate = function(models) {
    models.Item.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Item;
};
