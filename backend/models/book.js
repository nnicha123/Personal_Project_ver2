module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('book', {
    date: {
      type: DataTypes.STRING(200),
    },
    time: {
      type: DataTypes.STRING(200)
    },
    status: {
      type: DataTypes.ENUM('completed', 'pending', 'rejected')
    },
    paidTotal: {
      type: DataTypes.FLOAT
    }
  })
  return Book;
}