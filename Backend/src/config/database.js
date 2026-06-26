const mongoose = require('mongoose')

async function ConnectDB(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database Connected")
    })
    .catch((err) => {
        console.log("Database Connection Error: ", err)
    })
}

module.exports = ConnectDB