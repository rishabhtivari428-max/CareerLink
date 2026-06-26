const UserModel = require('../models/User.model')
const jwt = require('jsonwebtoken')

async function identifyUser(req, res, next){
    const token = req.cookies.token 

    if(!token){
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                message: "Invalid Token"
            })
        }

        const user = await UserModel.findOne({ _id: decoded.id })

        if(!user){
            return res.status(401).json({
                message: "Unauthorized access"
            })
        }

        req.user = user 
        next()
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

function authorizeRole(...roles){
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message: "Access denied"
            })
        }
        next()
    }
}

module.exports = {
    identifyUser,
    authorizeRole
}