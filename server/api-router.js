import express from "express";
import ApiController from "./api-controller.js";

const router = express.Router();

router.get("/tasks", ApiController.getTasks);
router.post("/tasks", ApiController.addTask);
router.put("/tasks/:id", ApiController.editTask);
router.delete("/tasks/:id", ApiController.deleteTask);

export default router;
