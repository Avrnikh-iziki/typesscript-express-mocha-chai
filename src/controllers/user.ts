import { Request, Response } from "express"
import { getUsers, deletUser, getUserById } from '../services/user'


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        return res
            .json(users)
            .end()
    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}

export const deletuser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await deletUser(id)
        return res
            .status(200)
            .json(user)
            .end()

    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}
export const updateuser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { username } = req.body
        if (!username)
            return res.sendStatus(400)
        if (!id)
            return res.sendStatus(400)
        const user = await getUserById(id)

        if (user) {
            user.username = username
            await user.save()
        }
        return res
            .status(200)
            .json(user)
            .end()

    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}

