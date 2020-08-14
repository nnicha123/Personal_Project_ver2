module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
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
  return Order
}