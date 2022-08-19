import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserInstance } from '../model/userModel'

const secrete = process.env.JWT_SECRETE as string

export async function auth(req: Request | any, res: Response, next: NextFunction) {
    try {
        const authorization = req['headers']['authorization'];
        console.log('@auth 10:==', authorization);
        //const authorization = req.cookies.token

        if (!authorization) {
            return res.status(401).json({
                Error: 'Kindly sign in as a user'
            })
        }
        const token = authorization?.slice(7, authorization.length) as string

        let verified = jwt.verify(token, secrete);

        if (!verified) {
            return res.status(401).json({
                Error: 'User not verified, you cant access this route'
            })
        }
        const { id } = verified as { [key: string]: string }

        const user = await UserInstance.findOne({ where: { id } })
        if (!user) {
            return res.status(404).json({
                Error: 'User not verified'
            })
        }

        req.user = verified
        next()
    } catch (error) {
        res.status(403).json({
            Error: 'User not logged in'
        })
    }
}