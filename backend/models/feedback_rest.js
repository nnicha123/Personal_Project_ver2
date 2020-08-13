module.exports = (sequelize, DataTypes) => {
  const FeedbackRest = sequelize.define('feedback_rest', {
    comment: {
      type: DataTypes.STRING(1000)
    },
    no_of_stars: {
      type: DataTypes.FLOAT
    }
  })

  return FeedbackRest
}