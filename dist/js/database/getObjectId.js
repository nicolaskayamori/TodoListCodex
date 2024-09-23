"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectId = void 0;
const mongodb_1 = require("mongodb");
const getObjectId = (id) => {
    const objectId = new mongodb_1.ObjectId(id);
    return objectId;
};
exports.getObjectId = getObjectId;
