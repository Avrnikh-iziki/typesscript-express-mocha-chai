
import mongoose, { Schema, Model, Types } from "mongoose";

interface Product {
    userid: string,
    name: string,
    title: string,
    price: number,
    desc: string
    data: Types.DocumentArray<Detail>
}

interface Detail {
    name: string,
    coment: Types.Array<string>

}
const Dschema = new Schema<Detail, Model<Detail>>({
    name: { type: String, required: true },
    coment: [String],

}, { timestamps: true })

const schema = new Schema<Product, Model<Product>>({
    userid: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String },
    price: { type: Number, required: true },
    desc: { type: String, min: 10, max: 300 },
    data: [Dschema]

})

export const Product = mongoose.model("product", schema)