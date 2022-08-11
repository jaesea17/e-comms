import express from 'express';
import { createView, dashboardView, loginView, registerView } from '../controller/viewsController';
import { auth } from '../middleware/auth';

const router = express.Router();

/* GET register page*/
router.get('/', registerView);

/* GET login page*/
router.get('/login', loginView);

/* GET dashboard page*/
router.get('/dashboard', dashboardView);

/* CREAT login page*/
router.get('/create', createView);

export default router;
