const jwt = require('jsonwebtoken');
const User = require('../Models/user.js');
require('dotenv').config();

const protect = async(req,res,next) => {
    
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({
                success: false,
                message : "not authorized"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({
                success: false,
                message : "not authorized"
            })
        }

        const user = await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({
                success: false,
                message : "User not found"
            })
        }
        
        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message : "Not Authorized"
        })
    }
}

module.exports = { protect };

