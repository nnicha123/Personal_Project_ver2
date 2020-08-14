module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING(50),
      unique: true
    },
    password: {
      type: DataTypes.STRING(200)
    },
    email: {
      type: DataTypes.STRING(100)
    },
    first_name: {
      type: DataTypes.STRING(50)
    },
    last_name: {
      type: DataTypes.STRING(50)
    },
    phone_number: {
      type: DataTypes.STRING(20)
    },
    profile_pic: {
      type: DataTypes.STRING(400)
    },
    user_grade: {
      type: DataTypes.ENUM('normal', 'top')
    },
    role: {
      type: DataTypes.ENUM('user', 'restaurant-owner', 'admin')
    }
  })
  User.associate = models => {
    User.hasMany(models.purchase_history, { foreignKey: 'user_id' })
    User.hasMany(models.orderedhistory_rest, { foreignKey: 'user_id' })
    User.hasMany(models.restaurant, { foreignKey: 'user_id' })
    User.belongsToMany(models.restaurant, { through: models.feedback_rest, as: 'User_Comment', foreignKey: 'user_id' })
    User.belongsToMany(models.menu, { through: models.feedback_menu, as: 'User_menuComment', foreignKey: 'user_id' })
    User.belongsToMany(models.menu, { through: models.order, as: 'User_orders', foreignKey: 'user_id' })
  }

  return User;
}