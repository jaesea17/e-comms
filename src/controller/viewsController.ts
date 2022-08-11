import express from 'express'
import { ProductInstance } from '../model/productModel';
import { UserInstance } from '../model/userModel';

export function registerView(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('./routes/register');
}

export function loginView(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('./routes/login');
}

export async function dashboardView(req: express.Request | any, res: express.Response, next: express.NextFunction) {
    try {
        //const id = req.params.id;
        const { id } = req.user;
        console.log('@viewsController 17:=', id)
        const record = await UserInstance.findOne({
            where: { id },
            include: [{// includes all products gotten by the user
                model: ProductInstance,
                as: 'products'
            }]
        })
        res.render('./routes/dashboard', { record })

    } catch (err) {
        res.status(500).json({
            message: 'failed to read single user',
            route: '/read/:id'
        })
    }
    //res.render('./routes/dashboard');
}

export function createView(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('./routes/create');
}