const todoService = require("../services/todo.service");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

exports.create = async (req, res) => {
    const token = req.headers.authorization.substring(7, req.headers.authorization.length);
    const decoded = jwt.verify(token, authConfig.access_secret);
    let userId = decoded.id
    const { name } = req.body;
    await todoService.create(name, userId).then((todo) => {
        res.json(todo);
    }).catch((error) => console.log(error));
};

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

exports.findOne = async (req, res) => {
    const token = req.headers.authorization.substring(7, req.headers.authorization.length);
    const decoded = jwt.verify(token, authConfig.access_secret);
    let userId = decoded.id
    return await todoService.findById(req.params.id, userId).then((todo) => {
        res.status(200).json(todo);
    }).catch((error) => console.log(error));
};

exports.update = async (req, res) => {
    const object = req.body
    return await todoService.updateById(req.params.id, object).then((todo) => {
        res.status(200).json(todo);
    }).catch((error) => console.log(error));
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.substring(7, req.headers.authorization.length);
    const decoded = jwt.verify(token, authConfig.access_secret);
    let userId = decoded.id
    await todoService.deleteById(id, userId).then((ok) => {
        res.status(200).json({
            deleted: id
        });
    }).catch((error) => console.log(error));
};