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
exports.deleteTaskById = exports.updateTaskById = exports.insertTaskByUserId = void 0;
const connection_1 = require("./connection");
const getObjectId_1 = require("./getObjectId");
const collection = connection_1.mongoDB.getCollection();
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connection_1.mongoDB.connect();
    });
}
;
const insertTaskByUserId = (id, task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = (0, getObjectId_1.getObjectId)(id);
        const request = collection.findOneAndUpdate({ _id: objectId }, { $push: { tasks: task } });
        return request;
    }
    catch (err) {
        console.error("Error on inseting task", err);
    }
});
exports.insertTaskByUserId = insertTaskByUserId;
const updateTaskById = (userId, taskId, updatedFileds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userObjectId = (0, getObjectId_1.getObjectId)(userId);
        const taskObjectId = (0, getObjectId_1.getObjectId)(taskId);
        const request = yield collection.updateOne({ _id: userObjectId, "tasks.id": taskObjectId }, { $set: { "tasks.$": Object.assign(Object.assign({}, updatedFileds), { id: taskObjectId }) } });
        return request;
    }
    catch (err) {
        console.error("Error while updating the task", err);
    }
});
exports.updateTaskById = updateTaskById;
const deleteTaskById = (userId, taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const userObjectId = (0, getObjectId_1.getObjectId)(userId);
    const taskObjectId = (0, getObjectId_1.getObjectId)(taskId);
    try {
        const request = yield collection.updateOne({ _id: userObjectId }, [
            {
                $set: {
                    tasks: {
                        $filter: {
                            input: '$tasks',
                            as: 'task',
                            cond: { $ne: ['$$task.id', taskObjectId] }
                        }
                    }
                }
            }
        ]);
        if (request.modifiedCount === 0)
            throw new Error("Task not found or user doesn't exist");
        return request;
    }
    catch (err) {
        console.error("Erronr on deleting task by id", err);
    }
});
exports.deleteTaskById = deleteTaskById;
initialize();
