"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.loginUserSchema = exports.updateUserSchema = exports.createUserSchema = exports.updateProductSchema = exports.createProductSchema = exports.updateTodoSchema = exports.options = exports.createTodoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//FOR TODO
exports.createTodoSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().required(),
    completed: joi_1.default.boolean().required()
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
exports.updateTodoSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase(),
    completed: joi_1.default.boolean()
});
// FOR PRODUCT
exports.createProductSchema = joi_1.default.object().keys({
    name: joi_1.default.string().lowercase().required(),
    image: joi_1.default.string().required(),
    brand: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    countInStock: joi_1.default.number().required(),
    rating: joi_1.default.number().required(),
    numReviews: joi_1.default.number().required()
});
exports.updateProductSchema = joi_1.default.object().keys({
    name: joi_1.default.string().lowercase(),
    image: joi_1.default.string(),
    brand: joi_1.default.string(),
    category: joi_1.default.string(),
    description: joi_1.default.string(),
    price: joi_1.default.number(),
    countInStock: joi_1.default.number(),
    rating: joi_1.default.number(),
    numReviews: joi_1.default.number()
});
// FOR User
exports.createUserSchema = joi_1.default.object().keys({
    fullname: joi_1.default.string().lowercase().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    gender: joi_1.default.string().required(),
    phone: joi_1.default.string().length(14),
    address: joi_1.default.string().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: joi_1.default.ref("password")
}).with('password', 'confirm_password'); //....adding a confirm password field
exports.updateUserSchema = joi_1.default.object().keys({
    fullname: joi_1.default.string().lowercase(),
    email: joi_1.default.string(),
    gender: joi_1.default.string(),
    phone: joi_1.default.string(),
    address: joi_1.default.string()
});
exports.loginUserSchema = joi_1.default.object().keys({
    //fullname: Joi.string().lowercase().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().required()
});
//Generate Token
const generateToken = (user) => {
    const passPhrase = process.env.JWT_SECRETE;
    return jsonwebtoken_1.default.sign(user, passPhrase, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
