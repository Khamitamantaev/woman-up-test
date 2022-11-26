const db = require('../models')
const Todo = db.todo
const User = db.user

/**
 * @description Сервис для работы с Todo
 */
class TodoService {

  constructor(model) {
    this.model = model;
  }

  /**
   * 
   * @param {String} name - Входящее название todo
   * @param {String} userId - Id User создающего todo 
   * @description Создает todo и обновляет User в базе данных
   */
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

  /**
   * 
   * @param {String} id - входящий id пользователя 
   * @description - Получаем массив todo конкретного пользователя 
   */
  async findAll(id) {
    const { todos } =  await User.findById(id).populate("todos");
    return todos
  }

  /**
   * 
   * @param {String} id - id получаемой todo из массива пользователя
   * @param {String} userId - id пользователя 
   * @description Find todo by id
   */
  async findById(id, userId) {
    const { todos } =  await User.findById(userId).populate("todos");
    return todos[todos.findIndex(todo => todo._id == id)]
  }

  /**
   * 
   * @param {String} id - id удаляемой todo 
   * @param {String} userId - id пользователя у которого удалится todo
   * @description delete todo by id 
   */
 async deleteById(id, userId) {
    await User.updateOne({ _id: userId }, { $pull: { todos: id } })
    return this.model.findByIdAndDelete(id);
  }

  /**
   * 
   * @param {String} id - Обновляемый todo id 
   * @param {String} object - объект для обновления
   * @description возвращает обновленный объект todo
   */
  async updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, { $set: { name: object.name, done: object.done } }, { new: true});
  }
}

module.exports = new TodoService(Todo);