"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const router = express_1.default.Router();
/* Create new request */
router.post('/create', todoController_1.Todos);
//Get all todos
router.get('/read', todoController_1.getTodos);
//Get single todo
router.get('/read/:id', todoController_1.getSingleTodo);
//Update the todo
router.patch('/update/:id', todoController_1.updateTodo);
router.delete('/delete/:id', todoController_1.deleteTodo);
exports.default = router;
