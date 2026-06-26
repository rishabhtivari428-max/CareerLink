require('dotenv').config()
const app = require('./src/app')
const ConnectDB = require('./src/config/database')

ConnectDB()

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

module.exports = app