const Usermodel = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
    try {
        const { username, email, password, role } = req.body

        if (!username || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const AlreadyExists = await Usermodel.findOne({ email })

        if (AlreadyExists) {
            return res.status(409).json({
                message: "User already exists please Login"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await Usermodel.create({
            username,
            email,
            password: hashedPassword,
            role
        })

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "3d" })

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: "none"
        })

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Inernal Server Error",
            error: error.message
        })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await Usermodel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "3d" })

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getMe(req, res) {
    try {
        const userId = req.user._id

        const user = await Usermodel.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            message: "User fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function logoutUser(req, res) {
    try {
        res.clearCookie("token")
        return res.status(200).json({
            message: "User logged out successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}