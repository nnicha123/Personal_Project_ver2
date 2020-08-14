module.exports = (sequelize, DataTypes) => {
  const BookingCriteria = sequelize.define('booking_criteria', {
    price_per_person: {
      type: DataTypes.FLOAT,
    },
    category: {
      type: DataTypes.ENUM('Buffet', 'Normal')
    },
    total_price: {
      type: DataTypes.FLOAT
    },
    booking_fee: {
      type: DataTypes.FLOAT
    }
  })
  BookingCriteria.associate = models => {
    BookingCriteria.belongsTo(models.restaurant, { foreignKey: 'restaurant_id' })
  }

  return BookingCriteria;
}