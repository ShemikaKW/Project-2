module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
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
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  User.associate = function(models) {
    models.User.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };

  return User;
};
