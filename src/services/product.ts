import { Product } from "../models/product"

export const creatProduct = (values: Record<string, any>) => new Product(values).save().then(product => product.toObject());
export const getProduct = () => Product.find()
export const getProductById = (id: string) => Product.findById(id)
export const updateProduct = (id: String, values: Record<string, any>) => Product.findOneAndUpdate({ _id: id }, values)
export const deletProduct = (id: string) => Product.findOneAndDelete({ _id: id })
