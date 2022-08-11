import Joi from 'joi'
import jwt from 'jsonwebtoken'


//FOR TODO
export const createTodoSchema = Joi.object().keys({
    title: Joi.string().lowercase().required(),
    completed: Joi.boolean().required()
})

export const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
}

export const updateTodoSchema = Joi.object().keys({
    title: Joi.string().lowercase(),
    completed: Joi.boolean()
})


// FOR PRODUCT
export const createProductSchema = Joi.object().keys({
    name: Joi.string().lowercase().required(),
    image: Joi.string().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    countInStock: Joi.number().required(),
    rating: Joi.number().required(),
    numReviews: Joi.number().required()
})

export const updateProductSchema = Joi.object().keys({
    name: Joi.string().lowercase(),
    image: Joi.string(),
    brand: Joi.string(),
    category: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    countInStock: Joi.number(),
    rating: Joi.number(),
    numReviews: Joi.number()
})


// FOR User
export const createUserSchema = Joi.object().keys({
    fullname: Joi.string().lowercase().required(),
    email: Joi.string().trim().lowercase().required(),
    gender: Joi.string().required(),
    phone: Joi.string().length(14),//.pattern(/^[0-9]+$/).required(),
    address: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: Joi.ref("password")
}).with('password', 'confirm_password')//....adding a confirm password field


export const updateUserSchema = Joi.object().keys({
    fullname: Joi.string().lowercase(),
    email: Joi.string(),
    gender: Joi.string(),
    phone: Joi.string(),
    address: Joi.string()
})

export const loginUserSchema = Joi.object().keys({
    //fullname: Joi.string().lowercase().required(),
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().required()
})


//Generate Token
export const generateToken = (user: Record<string, unknown>): unknown => {
    const passPhrase = process.env.JWT_SECRETE as string
    return jwt.sign(user, passPhrase, { expiresIn: '7d' })
}


