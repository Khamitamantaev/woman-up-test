const db = require("../models");
const User = db.user;

/**
 * @module verifySignUp
 * @description проверяем существование пользователя с идентичным username при регистрации
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
checkDuplicate = (req, res, next) => {

    /**
     * @description Find user by username
     * @param {String} username - проверяемый username  
     */
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        /**
     * @description Find user by email
     * @param {String} email - проверяемый email  
     */
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            next();
        });
    });
};

const verifySignUp = {
    checkDuplicate
};

module.exports = verifySignUp;
