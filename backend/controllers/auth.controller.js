const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * SignUp function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.signup = (req, res) => {

    /**
     * We create user here with data from incoming request
     */
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    /**
     * We save user after create on Mongodb with check error
     */
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "User was registered successfully!" });
        });

    });
};

/**
 * @description SignIn function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.signin = (req, res) => {

    /**
     * @description Find User by username
     */
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            /**
             * @description Check if user not exist on database send 404
             */
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            /**
             * @description  Check password is Valid with bcrypt.compareSync function
             * @param {String} req.body.password - password from req
             * @param {String} user.password - user password current
             */
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            
            /**
             * @description  Check if password not valid 
             */
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            /**
             * @description  Jwt sign function for create token
             */
            let token = jwt.sign({ id: user.id }, config.access_secret, {
                expiresIn: config.jwtExpiration // prod: 24 hours, dev: 1min
            });

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
        });
};