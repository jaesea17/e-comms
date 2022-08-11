"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getProductsApi = exports.getProducts = exports.createProduct = void 0;
const uuid_1 = require("uuid");
const productModel_1 = require("../model/productModel");
const userModel_1 = require("../model/userModel");
const utils_1 = require("../utils/utils");
//Creating a product
async function createProduct(req, res) {
    // res.json({ message: 'Hello User' });
    const id = (0, uuid_1.v4)();
    //const product = { ...req.body, id }
    try {
        const verified = req.user;
        const validationResult = utils_1.createProductSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        //const record = await ProductInstance.create(product)
        const record = await productModel_1.ProductInstance.create({
            id,
            ...req.body,
            userId: verified.id
        });
        res.status(201).json({
            message: 'You have successfully added a product',
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
exports.createProduct = createProduct;
//Getting Products used in the indexRoute
async function getProducts(req, res) {
    try {
        const limit = req.query?.limit;
        const { count, rows } = await productModel_1.ProductInstance.findAndCountAll({
            where: {}, limit
        });
        res.render('index', { products: rows });
        // return res.status(200).json({
        //     message: 'Retrieved Products successfully',
        //     products: rows
        // })
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to retrieve product',
            route: '/read '
        });
    }
}
exports.getProducts = getProducts;
async function getProductsApi(req, res) {
    try {
        const limit = req.query?.limit;
        const { count, rows } = await productModel_1.ProductInstance.findAndCountAll({
            where: {}, limit
        });
        //res.render('index', { products: rows })
        return res.status(200).json({
            message: 'Retrieved Products successfully',
            products: rows
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to retrieve product',
            route: '/read '
        });
    }
}
exports.getProductsApi = getProductsApi;
//Get single Product
async function getSingleProduct(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        //const id = req.params.id; OR
        const { id } = req.params;
        const product = await productModel_1.ProductInstance.findOne({
            where: { id },
            include: [
                {
                    model: userModel_1.UserInstance,
                    attributes: [
                        "id",
                        "fullname",
                        "email",
                        "gender",
                        "phone",
                        "address",
                        "createdAt",
                        "updatedAt"
                    ],
                    as: 'user'
                }
            ]
        });
        res.status(200).json({ message: 'successfully gotten single product', product });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to read single product',
            route: '/read/:id'
        });
    }
}
exports.getSingleProduct = getSingleProduct;
//Update Product
async function updateProduct(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const { name, image, brand, category, description, price, countInStock, rating, numReviews } = req.body;
        const validateUpdate = utils_1.updateProductSchema.validate(req.body, utils_1.options);
        if (validateUpdate.error) {
            return res.status(400).json({ Error: validateUpdate.error.details[0].message });
        }
        const record = await productModel_1.ProductInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find todo",
            });
        }
        const updatedProduct = await record.update({
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews
        });
        res.status(200).json({
            message: 'You have successfully updated product',
            record: updatedProduct
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to update product',
            route: '/update/:id'
        });
    }
}
exports.updateProduct = updateProduct;
//Delet single todo
async function deleteProduct(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const record = await productModel_1.ProductInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                message: 'cannot find product'
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: 'Product deleted successfully',
            deletedRecord
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to delete product',
            route: '/delete/:id'
        });
    }
}
exports.deleteProduct = deleteProduct;
