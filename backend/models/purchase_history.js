module.exports = (sequelize, DataTypes) => {
  const PurchaseHistory = sequelize.define('purchase_history', {
    status: {
      type: DataTypes.ENUM('completed', 'pending', 'rejected')
    },
    title: {
      type: DataTypes.STRING(100),
    },
    price: {
      type: DataTypes.FLOAT
    },
    menu_pic: {
      type: DataTypes.STRING(400)
    },
    quantity: {
      type: DataTypes.INTEGER
    }
  })
  PurchaseHistory.associate = models => {
    PurchaseHistory.belongsTo(models.user, { foreignKey: 'user_id' })
  }
  return PurchaseHistory
}