const todoService = require("../services/todo.service");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

/**
 * @description create todo controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.create = async (req, res) => {
    const token = req.headers.authorization.substring(7, req.headers.authorization.length);
    const decoded = jwt.verify(token, authConfig.access_secret);
    let userId = decoded.id
    const { name } = req.body;
    await todoService.create(name, userId).then((todo) => {
        res.json(todo);
    }).catch((error) => console.log(error));
};

/**
 * @description create todo controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.findAll = async (req, res) => {
    const token = req.headers.authorization.substring(7, req.headers.authorization.length);
    const decoded = jwt.verify(token, authConfig.access_secret);
    let userId = decoded.id
    return await todoService.findAll(userId).then((todos) => {
        res.status(200).json({
            todos
        });
    }).catch((error) => console.log(error));
};

/**
 * @description find one todo controller 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.findOne = async (req, res) => {
    const token = req.headers.authorization.substring(7, req.headers.authorization.length);
    const decoded = jwt.verify(token, authConfig.access_secret);
    let userId = decoded.id
    return await todoService.findById(req.params.id, userId).then((todo) => {
        res.status(200).json(todo);
    }).catch((error) => console.log(error));
};

/**
 * @description update todo controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.update = async (req, res) => {
    const object = req.body
    return await todoService.updateById(req.params.id, object).then((todo) => {
        res.status(200).json(todo);
    }).catch((error) => console.log(error));
};

/**
 * @description delete todo controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.delete = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.substring(7, req.headers.authorization.length);
    const decoded = jwt.verify(token, authConfig.access_secret);
    let userId = decoded.id
    await todoService.deleteById(id, userId).then(() => {
        res.status(200).json({
            deleted: id
        });
    }).catch((error) => console.log(error));
};

exports.findAllWithPagination = async (req, res) => {
    // console.log(res)
    const { page, size, name } = req.query;
    const getPagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    };
    let condition = name
        ? { name: { $regex: new RegExp(name), $options: "i" } }
        : {};

    const { limit, offset } = getPagination(page, size);
    await todoService.findAllCount(condition, offset, limit, res)
};