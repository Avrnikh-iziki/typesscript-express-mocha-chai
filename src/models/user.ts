import mongoose, { Schema, Model } from "mongoose"

interface User {
    username: string,
    email: string,
    password: string,
    salt: string,
    sessionToken: string,
    createdAt: number;
}
const schema = new Schema<User, Model<User>>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false,  },
    sessionToken: { type: String, select: false}
});

export const User = mongoose.model('User', schema)