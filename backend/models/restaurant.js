module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('restaurant', {
    name: {
      type: DataTypes.STRING(100),
      unique: true
    },
    description: {
      type: DataTypes.STRING(1000)
    },
    email: {
      type: DataTypes.STRING(100)
    },
    address: {
      type: DataTypes.STRING(500)
    },
    phone_number: {
      type: DataTypes.STRING(20)
    },
    profile_pic: {
      type: DataTypes.STRING(400)
    },
    cover_pic: {
      type: DataTypes.STRING(400)
    },
    back_theme: {
      type: DataTypes.ENUM('red', 'yellow', 'green', 'blue', 'default')
    },
    average_rating: {
      type: DataTypes.FLOAT
    }
  })
  Restaurant.associate = models => {
    Restaurant.hasMany(models.bank_detail, { foreignKey: 'restaurant_id' })
    Restaurant.hasMany(models.menu, { foreignKey: 'restaurant_id' })
    Restaurant.belongsTo(models.user, { foreignKey: 'user_id' })
    Restaurant.belongsToMany(models.user, { through: models.feedback_rest, as: 'Restaurant_getComment', foreignKey: 'restaurant_id' })
  }

  return Restaurant;
}