import App from "./app/index"
import "dotenv/config"

const DB_URL: string = `${process.env.URL_DEV}`

const server = new App(DB_URL)
server.listen()