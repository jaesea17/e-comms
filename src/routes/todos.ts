import express, { Request, Response, NextFunction } from 'express'
import { getTodos, Todos, getSingleTodo, updateTodo, deleteTodo } from '../controller/todoController'


const router = express.Router();

/* Create new request */
router.post('/create', Todos);

//Get all todos
router.get('/read', getTodos)

//Get single todo
router.get('/read/:id', getSingleTodo)

//Update the todo
router.patch('/update/:id', updateTodo)

router.delete('/delete/:id', deleteTodo)

export default router;
