"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getSingleTodo = exports.getTodos = exports.Todos = void 0;
const uuid_1 = require("uuid");
const todo_1 = require("../model/todo");
const utils_1 = require("../utils/utils");
async function Todos(req, res) {
    // res.json({ message: 'Hello User' });
    const id = (0, uuid_1.v4)();
    let todo = { ...req.body, id };
    try {
        const validationResult = utils_1.createTodoSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        const record = await todo_1.TodoInstance.create(todo);
        res.status(201).json({
            message: 'You have successfully created a todo',
            record
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to create',
            route: '/create'
        });
    }
}
exports.Todos = Todos;
async function getTodos(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const { count, rows } = await todo_1.TodoInstance.findAndCountAll({ where: {}, limit, offset });
        res.status(200).json({
            message: 'successfully fetched all todos from database',
            count,
            record: rows
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to read all todos',
            route: '/read'
        });
    }
}
exports.getTodos = getTodos;
//Get single todo
async function getSingleTodo(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        //const id = req.params.id;
        const { id } = req.params;
        const record = await todo_1.TodoInstance.findOne({ where: { id } });
        res.status(200).json({ message: 'successfully gotten single todo', record });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to read single todo',
            route: '/read/:id'
        });
    }
}
exports.getSingleTodo = getSingleTodo;
//Update todo
async function updateTodo(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const validateUpdate = utils_1.updateTodoSchema.validate(req.body, utils_1.options);
        if (validateUpdate.error) {
            return res.status(400).json({ Error: validateUpdate.error.details[0].message });
        }
        const record = await todo_1.TodoInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find todo",
            });
        }
        const updatedrecord = await record.update({
            title: title,
            completed: completed
        });
        res.status(200).json({
            message: 'You have successfully updated todo',
            record: updatedrecord
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to update todo',
            route: '/update/:id'
        });
    }
}
exports.updateTodo = updateTodo;
//Delet single todo
async function deleteTodo(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const record = await todo_1.TodoInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                message: 'cannot find todo'
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: 'Todo deleted successfully',
            deletedRecord
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to delete todo',
            route: '/delete/:id'
        });
    }
}
exports.deleteTodo = deleteTodo;
