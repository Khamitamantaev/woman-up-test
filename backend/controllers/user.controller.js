const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

/**
 * @description test public user controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.allAccess = (req, res) => {
    res.status(200).send("Public");
};

/**
 * @description test private user controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.privateAccess = (req, res) => {
    res.status(200).send("Private");
};

/**
 * @description get User info controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getInfo = (req, res) => {
    const token = req.headers.authorization.substring(7,  req.headers.authorization.length);
    const decoded = jwt.verify(token, config.access_secret);  
    let userId = decoded.id 
    res.json({
        id: userId
    }) 
};