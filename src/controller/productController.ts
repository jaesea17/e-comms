import express, { Request, Response, NextFunction } from "express";
import { v4 as uuid4 } from 'uuid';
import { ProductInstance } from "../model/productModel";
import { UserInstance } from "../model/userModel";
import { createProductSchema, updateProductSchema, options } from "../utils/utils";

//Creating a product
export async function createProduct(req: Request | any, res: Response) {
    // res.json({ message: 'Hello User' });
    const id = uuid4();
    //const product = { ...req.body, id }
    try {
        const verified = req.user;
        console.log('@productController 14:=', req.body)
        const validationResult = createProductSchema.validate(req.body, options)
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message })
        }
        //const record = await ProductInstance.create(product)
        const record = await ProductInstance.create({
            id,
            ...req.body,
            userId: verified.id
        })
        res.status(201).json({
            message: 'You have successfully added a product',
            record
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to create',
            route: '/create'
        })
    }
}

//Getting Products used in the indexRoute
export async function getProducts(req: Request, res: Response) {
    try {
        const limit = req.query?.limit as number | undefined
        const { count, rows } = await ProductInstance.findAndCountAll({
            where: {}, limit
        });

        res.render('index', { products: rows })
        // return res.status(200).json({
        //     message: 'Retrieved Products successfully',
        //     products: rows
        // })
    } catch (err) {
        res.status(500).json({
            message: 'failed to retrieve product',
            route: '/read '
        })
    }
}

//Getting all products
export async function getProductsApi(req: Request, res: Response) {
    try {
        const limit = req.query?.limit as number | undefined
        const { count, rows } = await ProductInstance.findAndCountAll({
            where: {}, limit
        });

        //res.render('index', { products: rows })
        return res.status(200).json({
            message: 'Retrieved Products successfully',
            products: rows
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to retrieve product',
            route: '/read '
        })
    }
}

//Get single Product
export async function getSingleProduct(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        //const id = req.params.id; OR
        const { id } = req.params;
        const product = await ProductInstance.findOne({
            where: { id },
            include: [
                {// includes the user that has the product
                    model: UserInstance,
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
        })
        if (!product) return res.status(404).json({ message: "Product with given ID not found" })
        res.status(200).json({ message: 'successfully gotten single product', product })

    } catch (err) {
        res.status(500).json({
            message: 'failed to read single product',
            route: '/read/:id'
        })
    }
}

//Update Product
export async function updateProduct(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;

        const {
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews
        } = req.body;

        const validateUpdate = updateProductSchema.validate(req.body, options)

        if (validateUpdate.error) {
            return res.status(400).json({ Error: validateUpdate.error.details[0].message })
        }

        const record = await ProductInstance.findOne({ where: { id } })
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find todo",
            })
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
        })
        return res.status(200).json({
            message: 'You have successfully updated product',
            record: updatedProduct
        })

    } catch (err) {
        return res.status(500).json({
            message: 'failed to update product',
            route: '/update/:id'
        })
    }
}


//Delete single Product
export async function deleteProduct(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const record = await ProductInstance.findOne({ where: { id } })
        if (!record) {
            return res.status(400).json({
                message: 'cannot find product'
            })
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: 'Product deleted successfully',
            deletedRecord
        })

    } catch (err) {
        res.status(500).json({
            message: 'failed to delete product',
            route: '/delete/:id'
        })
    }
}