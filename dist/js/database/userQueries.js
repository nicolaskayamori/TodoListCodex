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
exports.updateUserById = exports.getUserByEmail = exports.insertUser = void 0;
const connection_1 = require("./connection");
const getObjectId_1 = require("./getObjectId");
const collection = connection_1.mongoDB.getCollection();
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connection_1.mongoDB.connect();
    });
}
;
const insertUser = (document) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield collection.insertOne(document);
        return request;
    }
    catch (err) {
        console.error("Error in creating User", err);
    }
});
exports.insertUser = insertUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield collection.findOne({ email });
        return request;
    }
    catch (err) {
        console.error('Error on getting user by email', err);
    }
});
exports.getUserByEmail = getUserByEmail;
const updateUserById = (id, changes) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = (0, getObjectId_1.getObjectId)(id);
        const updateFields = {};
        if (changes.name !== undefined)
            updateFields.name = changes.name;
        if (changes.age !== undefined)
            updateFields.age = changes.age;
        if (changes.photo !== undefined)
            updateFields.photo = changes.photo;
        const request = yield collection.updateOne({ _id: objectId }, { $set: updateFields });
        return request;
    }
    catch (error) {
        console.error('Error updating user', error);
    }
});
exports.updateUserById = updateUserById;
initialize();
