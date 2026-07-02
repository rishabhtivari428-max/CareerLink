require('dotenv').config()
const app = require('./src/app')
const ConnectDB = require('./src/config/database')

ConnectDB()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

module.exports = app