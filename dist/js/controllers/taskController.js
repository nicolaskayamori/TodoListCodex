"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.addTask = void 0;
const taskQueries_1 = require("../database/taskQueries");
const taskDto_1 = require("../dtos/taskDto");
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, Date, isCompleted, description } = req.body;
        const task = new taskDto_1.TaskDTO(name, Date, isCompleted, description);
        console.log(task);
        const data = yield (0, taskQueries_1.insertTaskByUserId)(id, task);
        if (!data)
            return res.status(400).json({ message: "Error while adding the task", sucess: false });
        res.status(200).json({ message: "Task added sucefully", data: task, sucess: true });
    }
    catch (err) {
        console.error("Error while adding the task", err);
        res.status(404).json({ message: "Error while adding the task", sucess: false });
    }
});
exports.addTask = addTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, taskId } = req.params;
        const updatedFields = req.body;
        const data = yield (0, taskQueries_1.updateTaskById)(userId, taskId, updatedFields);
        if (!data)
            return res.status(400).json({ message: "Error while updating the task", sucess: false });
        res.status(200).json({ message: "Task updated sucefully", sucess: true });
    }
    catch (err) {
        console.error("Error while editing task", err);
        res.status(404).json({ message: "Error while editing task", sucess: false });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, taskId } = req.params;
        const data = yield (0, taskQueries_1.deleteTaskById)(userId, taskId);
        if (!data)
            return res.status(400).json({ message: "Error while deleting the task", sucess: false });
        res.status(200).json({ message: "Task deleted sucefully", sucess: true });
    }
    catch (err) {
        console.error("Error while deleting task", err);
        res.status(404).json({ message: "Error while deleting task", sucess: false });
    }
});
exports.deleteTask = deleteTask;
