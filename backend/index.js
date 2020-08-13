require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./models')
const bodyParser = require('body-parser')

const bankDetailRoute = require('./routes/bank_detail')
const feedbackMenuRoute = require('./routes/feedback_menu')
const feedbackRestRoute = require('./routes/feedback_rest')
const menuRoute = require('./routes/menu')
const orderRoute = require('./routes/order')
const purchaseHistoryRoute = require('./routes/purchase_history')
const restaurantRoute = require('./routes/restaurant')
const userRoute = require('./routes/user')

require('./config/passport/passport')

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/bank-detail', bankDetailRoute)
app.use('/feedback-menu', feedbackMenuRoute)
app.use('/feedback-rest', feedbackRestRoute)
app.use('/menu', menuRoute)
app.use('/order', orderRoute)
app.use('/purchase-history', purchaseHistoryRoute)
app.use('/restaurant', restaurantRoute)
app.use('/user', userRoute)

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => console.log('Listening on port', process.env.PORT));
})