module.exports = (sequelize, DataTypes) => {
  const FeedbackMenu = sequelize.define('feedback_menu', {
    comment: {
      type: DataTypes.STRING(1000)
    },
    no_of_stars: {
      type: DataTypes.FLOAT
    }
  })
  return FeedbackMenu
}