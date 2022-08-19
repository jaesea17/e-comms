"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createView = exports.dashboardView = exports.loginView = exports.registerView = void 0;
const productModel_1 = require("../model/productModel");
const userModel_1 = require("../model/userModel");
function registerView(req, res, next) {
    res.render('./routes/register');
}
exports.registerView = registerView;
function loginView(req, res, next) {
    res.render('./routes/login');
}
exports.loginView = loginView;
async function dashboardView(req, res, next) {
    try {
        //const id = req.params.id;
        const id = req['rawHeaders'][7];
        console.log('@viewsController 17:=', id);
        const record = await userModel_1.UserInstance.findOne({
            where: { id },
            include: [{
                    model: productModel_1.ProductInstance,
                    as: 'products'
                }]
        });
        console.log('@viewsController_25:=', record);
        res.render('./routes/dashboard', { record });
    }
    catch (err) {
        console.log('@viewsController 28:=', req.user);
        res.status(500).json({
            message: 'failed to read single user',
            route: '/read/:id'
        });
    }
    // console.log('@viewsController 34 req.params:=', req['rawHeaders'][7]);
    // res.render('./routes/dashboard');
}
exports.dashboardView = dashboardView;
function createView(req, res, next) {
    res.render('./routes/create');
}
exports.createView = createView;
