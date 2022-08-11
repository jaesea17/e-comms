import express from 'express';
import { getProducts } from '../controller/productController';

const router = express.Router();

//index route, displays all the products
router.get('/', getProducts);

export default router;