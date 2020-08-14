module.exports = (sequelize, DataTypes) => {
  const OrderedHistoryRes = sequelize.define('orderedhistory_rest', {
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
  OrderedHistoryRes.associate = models => {
    OrderedHistoryRes.belongsTo(models.user, { foreignKey: 'user_id' })
  }
  return OrderedHistoryRes
}