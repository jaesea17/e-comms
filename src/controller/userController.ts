import express, { Request, Response, NextFunction } from "express";
import { v4 as uuid4 } from 'uuid';
import { UserInstance } from "../model/userModel";
import { createUserSchema, updateUserSchema, loginUserSchema, options, generateToken } from "../utils/utils";
import bcrypt from 'bcryptjs';
import { ProductInstance } from "../model/productModel";

//Creating a user
export async function createUser(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    const id = uuid4();
    const user = { ...req.body, id }
    try {
        const validationResult = createUserSchema.validate(req.body, options)
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message })
        }
        const duplicateEmail = await UserInstance.findOne({ where: { email: req.body.email } });
        if (duplicateEmail) {
            return res.status(409).json({
                message: 'Email already exists'
            })
        }
        const duplicatePhone = await UserInstance.findOne({ where: { phone: req.body.phone } });
        if (duplicatePhone) {
            return res.status(409).json({
                message: 'Phone number already exists'
            })
        }

        //const record = await UserInstance.create(user)

        const passwordHash = await bcrypt.hash(req.body.password, 8);
        const record = await UserInstance.create({
            id: id,
            fullname: req.body.fullname,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone,
            address: req.body.address,
            password: passwordHash
        })

        res.status(201).json({
            message: 'You have successfully registered',
            record
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to create user',
            route: '/create'
        })
    }
}

//Getting users
export async function getUsers(req: Request, res: Response) {
    try {
        const limit = req.query?.limit as number | undefined
        const { count, rows } = await UserInstance.findAndCountAll({
            where: {},
            limit,
            include: [{// includes all products gotten by the user
                model: ProductInstance,
                as: 'products'
            }]
        });
        return res.status(200).json({
            message: 'Retrieved user successfully',
            users: rows
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to retrieve user',
            route: '/read '
        })
    }
}

//Get single user
export async function getSingleUser(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        //const id = req.params.id;
        const { id } = req.params;
        const record = await UserInstance.findOne({
            where: { id },
            include: [{// includes all products gotten by the user
                model: ProductInstance,
                as: 'products'
            }]
        })
        res.status(200).json({ message: 'successfully gotten single user', record })

    } catch (err) {
        res.status(500).json({
            message: 'failed to read single user',
            route: '/read/:id'
        })
    }
}

//Update Product
export async function updateUser(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const {
            fullname,
            email,
            gender,
            phone,
            address
        } = req.body;
        const validateUpdate = updateUserSchema.validate(req.body, options)
        if (validateUpdate.error) {
            return res.status(400).json({ Error: validateUpdate.error.details[0].message })
        }
        const record = await UserInstance.findOne({ where: { id } })
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find user",
            })
        }
        const updatedUser = await record.update({
            fullname,
            email,
            gender,
            phone,
            address
        })
        res.status(200).json({
            message: 'You have successfully updated user',
            record: updatedUser
        })

    } catch (err) {
        res.status(500).json({
            message: 'failed to update user',
            route: '/update/:id'
        })
    }
}


//Delet single todo
export async function deleteUser(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const record = await UserInstance.findOne({ where: { id } })
        if (!record) {
            return res.status(400).json({
                message: 'cannot find user'
            })
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: 'User deleted successfully',
            deletedRecord
        })

    } catch (err) {
        res.status(500).json({
            message: 'failed to delete user',
            route: '/delete/:id'
        })
    }
}

export async function loginUser(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    const id = uuid4();
    const user = { ...req.body, id }
    try {
        const validationResult = loginUserSchema.validate(req.body, options)
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message })
        }

        const User = await UserInstance.findOne({ where: { email: req.body.email } }) as unknown as { [key: string]: string }
        const { id } = User;
        const token = generateToken({ id });

        const validUser = await bcrypt.compare(req.body.password, User.password)
        if (!validUser) {
            return res.status(401).json({ message: "Password do not match" })
        }
        if (validUser) {
            return res.status(200).json({ message: "Login successful", token, User })
        }
    } catch (err) {
        return res.status(500).json({
            message: 'failed to login user',
            route: '/login'
        })
    }
}


