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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.loginUser = exports.registerUser = void 0;
const userQueries_1 = require("../database/userQueries");
const bcryptjs_1 = require("bcryptjs");
const userDto_1 = require("../dtos/userDto");
const bcryptjs_2 = __importDefault(require("bcryptjs"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, gender, age, email, password } = req.body;
        const hashedPassword = yield (0, bcryptjs_1.hash)(password, 6);
        const emailExists = yield (0, userQueries_1.getUserByEmail)(email);
        if (emailExists)
            return res.status(409).json({ message: "Email alredy exists", sucess: false });
        const user = new userDto_1.UserDTO(name, gender, age, email, hashedPassword);
        const data = yield (0, userQueries_1.insertUser)(user);
        res.status(200).json({ message: "User has been registered", sucess: true });
    }
    catch (err) {
        console.error("Error during creating the user operation", err);
        res.status(404).json({ message: "Error on creating user", sucess: false });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Invalid values provided for login", success: false });
        const user = yield (0, userQueries_1.getUserByEmail)(email);
        if (!user)
            return res.status(401).json({ message: "Invalid credentials", success: false });
        const passwordMatch = yield bcryptjs_2.default.compare(password, user.password);
        if (!passwordMatch)
            return res.status(401).json({ message: "Invalid credentials", success: false });
        return res.status(200).json({ message: "Login successful", data: user, success: true });
    }
    catch (err) {
        console.error("Error during login:", err);
        return res.status(400).json({ message: "Login operation error", success: false });
    }
});
exports.loginUser = loginUser;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, age, photo } = req.body;
        const changeInfos = { name: name, age: age, photo: photo };
        const data = yield (0, userQueries_1.updateUserById)(id, changeInfos);
        if (!data)
            return res.status(400).json({ message: "Error on editing profile", success: false });
        res.status(200).json({ message: "Profile edited successfully", success: true });
    }
    catch (err) {
        console.error("Error during updating profile:", err);
        return res.status(404).json({ message: "Error on editing profile", success: false });
    }
});
exports.updateProfile = updateProfile;
