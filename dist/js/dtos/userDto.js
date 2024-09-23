"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
class UserDTO {
    constructor(name, gender, age, email, password) {
        if (!name || !gender || !email || !password)
            throw new Error("Invalid values provided for UserDTO");
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.email = email;
        this.password = password;
        this.tasks = [];
        this.photo = "";
    }
}
exports.UserDTO = UserDTO;
;
