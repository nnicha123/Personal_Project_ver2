module.exports = (sequelize, DataTypes) => {
  const PurchaseHistory = sequelize.define('purchase_history', {
    status: {
      type: DataTypes.ENUM('completed', 'pending', 'rejected')
    },
    item: {
      type: DataTypes.STRING(100)
    },
    price: {
      type: DataTypes.FLOAT
    }
  })
  PurchaseHistory.associate = models => {
    PurchaseHistory.belongsTo(models.user, { foreignKey: 'user_id' })
  }
  return PurchaseHistory
}