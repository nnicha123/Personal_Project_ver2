module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notification', {
    menu_request: {
      type: DataTypes.INTEGER
    },
    booking_request: {
      type: DataTypes.INTEGER
    },
    your_order: {
      type: DataTypes.INTEGER
    },
    your_booking: {
      type: DataTypes.INTEGER
    }
  })
  Notification.associate = models => {
    Notification.belongsTo(models.user, { foreignKey: 'user_id' })
  }

  return Notification;
}