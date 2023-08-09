import { Router } from "express";
import { newPrduct, deletePrduct, updatePrduct, allPrduct, oneProduct } from '../controllers/product'
import { isAutenticated, isProductOwber } from "../middlewares/index"
export class Product {
    public routes(route: Router): void {
        route.get('/product', allPrduct)
        route.get('/product/:p_id', oneProduct)
        route.post('/product',isAutenticated, newPrduct)
        route.patch('/product/:p_id', isAutenticated, isProductOwber, updatePrduct)
        route.delete('/product/:p_id', isAutenticated, isProductOwber, deletePrduct)
    }
}