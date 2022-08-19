import express from 'express';
import { createUser, deleteUser, getUsers, getSingleUser, updateUser, loginUser, logoutUser } from '../controller/userController'
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

//Delete 
router.delete('/delete/:id', auth, deleteUser);

//Logout User
router.get('/logoutUsers', logoutUser)



export default router;
