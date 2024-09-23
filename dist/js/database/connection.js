"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.mongoDB = void 0;
const dotenv = __importStar(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv.config({ path: "./.env" });
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
console.log(process.env.MONGO_URI);
class MongoDB {
    constructor() {
        this.uri = process.env.MONGO_URI;
        this.isConnected = false;
        this.client = new mongodb_1.MongoClient(this.uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        this.db = this.client.db("codex-todo");
        this.collection = this.db.collection("users");
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect the client to the server	(optional starting in v4.7)
                if (!this.isConnected) {
                    yield this.client.connect();
                    // Send a ping to confirm a successful connection
                    yield this.client.db("admin").command({ ping: 1 });
                    console.log("Pinged your deployment. You successfully connected to MongoDB!");
                    this.isConnected = true;
                }
                return this.client;
            }
            catch (err) {
                console.error("Error on connection", err);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected) {
                yield this.client.close();
                this.isConnected = false;
                console.log("MongoDB connection closed");
            }
        });
    }
    getClient() {
        return this.client;
    }
    getDb() {
        return this.db;
    }
    getCollection() {
        return this.collection;
    }
}
;
exports.mongoDB = new MongoDB;
