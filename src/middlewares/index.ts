import { Request, Response, NextFunction } from "express";
import { getUserBySessionToken } from "../services/user";
import { getProductById } from "../services/product"

declare module "express-session" {
    interface SessionData {
        userId: string;
    }
}

export const isAutenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies[`${process.env.Cookies}`]
        if (!sessionToken)
            return res.sendStatus(403)
        const user = await getUserBySessionToken(`${sessionToken}`)
        if (!user)
            return res.sendStatus(403)

        req.session.userId = user._id.toString()
        return next()

    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const currentUserId = req.session.userId
        if (!currentUserId || currentUserId != id)
            return res.sendStatus(403)
        next()
    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}

export const isProductOwber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { p_id } = req.params
        if (!p_id)
            return res
                .status(403)
                .end()
        const prod = await getProductById(`${p_id}`)
        if (!prod)
            return res
                .status(403)
                .end()
        const currentUserId = req.session.userId
        if (!currentUserId || currentUserId != prod.userid)
            return res
                .status(403)
                .end()
        next()
    } catch (err) {
        console.log(err)
        return res
            .status(400)
            .end()
    }
}