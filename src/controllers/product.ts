import { Response, Request } from "express"
import { creatProduct, getProduct, getProductById, updateProduct, deletProduct } from "../services/product"

export const newPrduct = async (req: Request, res: Response) => {
    try {
        const { product } = req.body
        if (!product)
            return res
                .status(400)
                .end()
        const pro = await creatProduct(product)
        return res
            .status(200)
            .json(pro)
            .end()
    } catch (err) {
        console.log(err)
        res
            .status(400)
            .end()
    }
}
export const allPrduct = async (req: Request, res: Response) => {
    try {
        const product = await getProduct()
        return res
            .status(200)
            .json(product)
            .end()
    } catch (err) {
        console.log(err)
        res
            .status(400)
            .end()
    }
}
export const oneProduct = async (req: Request, res: Response) => {
    try {
        const { p_id } = req.params
        if (!p_id)
            return res
                .status(400)
                .end(200)
        const product = await getProductById(p_id)
        return res
            .status(200)
            .json(product)
            .end()
    } catch (err) {
        console.log(err)
        return res
            .status(200)
            .end()
    }
}
export const updatePrduct = async (req: Request, res: Response) => {
    try {
        const { product } = req.body
        const { p_id } = req.params
        if (!product)
            return res
                .status(400)
                .end()
        await updateProduct(`${p_id}`, product)
        return res
            .status(200)
            .json(product)
            .end()
    } catch (err) {
        console.log(err)
        res
            .status(400)
            .end()
    }
}
export const deletePrduct = async (req: Request, res: Response) => {
    try {
        const { p_id } = req.params
        if (!p_id)
            return res
                .status(400)
                .end()
        await deletProduct(`${p_id}`)
        return res
            .status(200)
            .end()

    } catch (err) {
        console.log(err)
        res
            .status(400)
            .end()
    }
}