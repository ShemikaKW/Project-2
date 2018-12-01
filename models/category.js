module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Category.associate = function(models) {
    models.Category.hasMany(models.Item);
  };

  return Category;
};
