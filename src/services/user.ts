import { User } from "../models/user"

export const getUsers = () => User.find()
export const getUserByEmail = (email: string) => User.findOne({ email })
export const getUserBySessionToken = (sessionToken: String) => User.findOne({ sessionToken })
export const getUserById = (id: string) => User.findById(id)
export const creatUser = (values: Record<string, any>) => new User(values).save().then(user=> user.toObject());
export const deletUser = (id: string) => User.findOneAndDelete({ _id: id })
export const updateUser = (id: String) => User.findByIdAndUpdate({ _id: id })