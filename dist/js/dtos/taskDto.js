"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDTO = void 0;
const mongodb_1 = require("mongodb");
class TaskDTO {
    constructor(name, stringDate, stringIsCompleted, description) {
        this.setIsCompleted = (stringIsCompleted) => {
            return stringIsCompleted === "true";
        };
        if (!name || !stringDate || !stringIsCompleted || !description)
            throw new Error("Invalid values provided for TaskDTO");
        this.name = name;
        this.date = new Date(stringDate);
        this.isCompleted = this.setIsCompleted(stringIsCompleted);
        this.description = description;
        this.id = this.setId();
    }
    setId() {
        const objectId = new mongodb_1.ObjectId();
        return objectId;
    }
    ;
}
exports.TaskDTO = TaskDTO;
;
