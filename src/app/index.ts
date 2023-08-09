import express, { Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import session from 'express-session'
import mongoose from "mongoose"
import "dotenv/config"
import { Auth } from "../routes/authentication"
import { User } from "../routes/user"
import { Product } from "../routes/product"

const URL: string = process.env.NODE_ENV == "test"
    ? `${process.env.URL_TEST}`
    : `${process.env.URL_DEV}`

export default class App {
    public app: Application;
    public auth: Auth = new Auth();
    public user: User = new User();
    public product: Product = new Product()
    private port: string = `${process.env.PORT}`
    constructor(public URL: string) {
        this.app = express();
        this.config();
        this.db()
        this.auth.routes(this.app)
        this.user.routes(this.app)
        this.product.routes(this.app)

    }
    private db(): void {
        mongoose
            .connect(this.URL)
            .catch(err => { console.log(err) })
    }
    private config(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        });

        this.app.use(session({
            resave: false,
            saveUninitialized: false,
            secret: `${process.env.SECRET}`,
            cookie: { maxAge: 60 * 60 * 24 },
        }))
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser())
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`app listen on http://localhost:${this.port}`)
        })
    }
}


