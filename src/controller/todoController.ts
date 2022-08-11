import express, { Request, Response, NextFunction } from "express";
import { v4 as uuid4 } from 'uuid';
import { TodoInstance } from "../model/todo";
import { createTodoSchema, updateTodoSchema, options } from "../utils/utils";

export async function Todos(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    const id = uuid4();
    let todo = { ...req.body, id }
    try {
        const validationResult = createTodoSchema.validate(req.body, options)
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message })
        }
        const record = await TodoInstance.create(todo)
        res.status(201).json({
            message: 'You have successfully created a todo',
            record
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to create',
            route: '/create'
        })
    }
}

export async function getTodos(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        const limit = req.query?.limit as number | undefined;
        const offset = req.query?.offset as number | undefined
        const { count, rows } = await TodoInstance.findAndCountAll({ where: {}, limit, offset })
        res.status(200).json({
            message: 'successfully fetched all todos from database',
            count,
            record: rows
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to read all todos',
            route: '/read'
        })
    }
}

//Get single todo
export async function getSingleTodo(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        //const id = req.params.id;
        const { id } = req.params;
        const record = await TodoInstance.findOne({ where: { id } })
        res.status(200).json({ message: 'successfully gotten single todo', record })

    } catch (err) {
        res.status(500).json({
            message: 'failed to read single todo',
            route: '/read/:id'
        })
    }
}

//Update todo
export async function updateTodo(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const validateUpdate = updateTodoSchema.validate(req.body, options)
        if (validateUpdate.error) {
            return res.status(400).json({ Error: validateUpdate.error.details[0].message })
        }
        const record = await TodoInstance.findOne({ where: { id } })
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find todo",
            })
        }
        const updatedrecord = await record.update({
            title: title,
            completed: completed
        })
        res.status(200).json({
            message: 'You have successfully updated todo',
            record: updatedrecord
        })

    } catch (err) {
        res.status(500).json({
            message: 'failed to update todo',
            route: '/update/:id'
        })
    }
}


//Delet single todo
export async function deleteTodo(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const record = await TodoInstance.findOne({ where: { id } })
        if (!record) {
            return res.status(400).json({
                message: 'cannot find todo'
            })
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: 'Todo deleted successfully',
            deletedRecord
        })

    } catch (err) {
        res.status(500).json({
            message: 'failed to delete todo',
            route: '/delete/:id'
        })
    }
}