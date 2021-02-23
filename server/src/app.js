const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
require('./routes')(app)

sequelize.sync()
.then(() => {
  app.listen(config.port, () => {
  console.log(`Server listening at http://localhost:${config.port}`)
})
})
