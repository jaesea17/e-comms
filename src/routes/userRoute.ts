import express, { Request, Response, NextFunction } from 'express';
import { createUser, deleteUser, getUsers, getSingleUser, updateUser, loginUser, } from '../controller/userController'
import { auth } from '../middleware/auth'

const router = express.Router();

// ADD A NEW User
router.post('/create', createUser);
//LOGIN USER
router.post('/login', loginUser);

/* GET all users*/
router.get('/read', getUsers);

//Get single user
router.get('/read/:id', getSingleUser)

//Update the user
router.patch('/update/:id', auth, updateUser)

//Delet 
router.delete('/delete/:id', auth, deleteUser)

router.get('/getUsers', deleteUser)



export default router;
