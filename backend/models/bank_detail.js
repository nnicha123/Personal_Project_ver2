module.exports = (sequelize, DataTypes) => {
  const BankDetail = sequelize.define('bank_detail', {
    bank_name: {
      type: DataTypes.STRING(100),
    },
    account_number: {
      type: DataTypes.STRING(100)
    }
  })
  BankDetail.associate = models => {
    BankDetail.belongsTo(models.restaurant, { foreignKey: 'restaurant_id' })
  }

  return BankDetail;
}