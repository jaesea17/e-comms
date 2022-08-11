import express from 'express';
import { createProduct, deleteProduct, getProductsApi, getSingleProduct, updateProduct } from '../controller/productController';
import { auth } from '../middleware/auth';

const router = express.Router();

// ADD A NEW PRODUCT
router.post('/create', auth, createProduct);

/* GET all products*/
router.get('/read', getProductsApi);

//Get single product
router.get('/read/:id', getSingleProduct)

//Update the todo
router.patch('/update/:id', auth, updateProduct)

router.delete('/delete/:id', auth, deleteProduct)



export default router;
