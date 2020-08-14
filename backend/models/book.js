module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('book', {
    date: {
      type: DataTypes.STRING(200),
    },
    time: {
      type: DataTypes.STRING(200)
    }
  })
  return Book;
}