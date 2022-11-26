const db = require('../models')
const Todo = db.todo
const User = db.user

class TodoService {

  constructor(model) {
    this.model = model;
  }

  async create(name, userId) {
    const newTodo = { name, done: false };
    const todo = new this.model(newTodo);
    await User.findByIdAndUpdate(
        userId,
        { $push: { todos: todo._id } },
        { new: true, useFindAndModify: false }
      )

    return todo.save();
  }

  async findAll(id) {
    const { todos } =  await User.findById(id).populate("todos");
    return todos
  }

  async findById(id, userId) {
    const { todos } =  await User.findById(userId).populate("todos");
    return todos[todos.findIndex(todo => todo._id == id)]
  }

 async deleteById(id, userId) {
    await User.updateOne({ _id: userId }, { $pull: { todos: id } })
    return this.model.findByIdAndDelete(id);
  }

  async updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, { $set: { name: object.name, done: object.done } }, { new: true});
  }
}

module.exports = new TodoService(Todo);