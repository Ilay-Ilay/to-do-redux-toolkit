import dotenv from "dotenv";
dotenv.config();
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    logging: false,
    dialect: "postgres",
  }
);

const User = sequelize.define("user", {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Task = sequelize.define("task", {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  name: { type: DataTypes.STRING },
  status: { type: DataTypes.BOOLEAN },
});

User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });

export { sequelize, User, Task };
