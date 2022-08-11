"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// ADD A NEW PRODUCT
router.post('/create', auth_1.auth, productController_1.createProduct);
/* GET all products*/
router.get('/read', productController_1.getProductsApi);
//Get single product
router.get('/read/:id', productController_1.getSingleProduct);
//Update the todo
router.patch('/update/:id', auth_1.auth, productController_1.updateProduct);
router.delete('/delete/:id', auth_1.auth, productController_1.deleteProduct);
exports.default = router;
