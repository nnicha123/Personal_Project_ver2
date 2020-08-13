module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('menu', {
    title: {
      type: DataTypes.STRING(100),
      unique: true
    },
    description: {
      type: DataTypes.STRING(1000)
    },
    menu_pic: {
      type: DataTypes.STRING(400)
    },
    price: {
      type: DataTypes.FLOAT
    },
    average_rating: {
      type: DataTypes.FLOAT
    },
    promotion: {
      type: DataTypes.BOOLEAN
    },
    category: {
      type: DataTypes.STRING(400)
    }
  })
  Menu.associate = models => {
    Menu.belongsToMany(models.user, { through: models.feedback_menu, as: 'Menu_getComment', foreignKey: 'menu_id' })
    Menu.belongsToMany(models.user, { through: models.order, as: 'Menu_getOrdered', foreignKey: 'menu_id' })
    Menu.belongsTo(models.restaurant, { foreignKey: 'restaurant_id' })
  }

  return Menu;
}