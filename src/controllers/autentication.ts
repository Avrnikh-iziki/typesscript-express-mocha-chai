import { Response, Request } from "express";
import { random, autentication } from "../helper/index"
import { getUserByEmail, creatUser } from "../services/user"
import 'dotenv/config'

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password)
            return res.sendStatus(400)
        const user = await getUserByEmail(email).select('+salt +password')

        if (!user)
            return res.sendStatus(400)

        const expectedHasPassword = autentication(user.salt, password)

        if (user.password != expectedHasPassword)
            return res.sendStatus(403)

        const salt = random()
        user.sessionToken = autentication(salt, user._id.toString())
        await user.save()
        res.cookie(`${process.env.Cookies}`, user.sessionToken, { domain: 'localhost', path: "/" })

        return res
            .status(200)
            .json(user)
            .end()

    } catch (err) {
        console.log(err)
        return res
            .status(400)
            .end()
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username)
            return res.sendStatus(400)

        const existuser = await getUserByEmail(email)

        if (existuser)
            return res.sendStatus(400)

        const salt = random()
        const user = creatUser({
            email,
            username,
            salt,
            password: autentication(salt, password),
        })
        return res
            .json(user)
            .status(200)
            .end();

    } catch (err) {
        console.log(err)
        return res
            .status(400)
            .end()
    }
}