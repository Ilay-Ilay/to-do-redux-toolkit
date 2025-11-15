import { Task } from "./db.js";
import APIError from "./error.js";

class ApiController {
  static getTasks = async (req, res, next) => {
    try {
      const tasks = await Task.findAll({ where: { user_id: req.userId } });
      res.status(200).json({ tasks });
    } catch (error) {
      next(error);
    }
  };
  static addTask = async (req, res, next) => {
    const { name, status } = req.body;
    try {
      const task = await Task.create({ name, status, user_id: req.userId });
      res.status(201).json({ message: "Task created", task });
    } catch (error) {
      next(error);
    }
  };
  static editTask = async (req, res, next) => {
    const { name, status } = req.body;
    const { id } = req.params;
    console.log(`ID ${id}`);
    console.log(`NAME ${name}`);
    console.log(`STATUS ${status}`);
    try {
      const [amount, rows] = await Task.update(
        { name, status },
        { where: { id, user_id: req.userId }, returning: true }
      );
      console.log(amount);
      console.log(rows);
      if (amount === 0) throw APIError.NotFound("Task not found");

      res.status(200).json({
        message: "Task updated",
        task: rows[0],
      });
    } catch (error) {
      next(error);
    }
  };
  static deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedCount = await Task.destroy({
        where: { id, user_id: req.userId },
      });
      if (deletedCount === 0) throw APIError.NotFound("Task not found");
      res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default ApiController;
