import "dotenv/config"
import chaiHttp from 'chai-http'
import chai from "chai"
import App from "../src/app/index"
import { User } from "../src/models/user"

const should = chai.should()
const expect = chai.expect
const DB_url: string = `${process.env.URL_TEST}`
chai.use(chaiHttp)

const server = new App(DB_url).app
const req = chai.request(server).keepOpen()
let id: string;
let cookie: string;

describe("API: authentication", () => {
    before(async () => {
        await User.deleteMany({})
    })
    it('register', async () => {
        let user = {
            "email": "avrnikh@gmail.com",
            "password": "123",
            "username": "najibiziki"
        }
        try {
            const res = await req.post('/auth/register/').send(user)
            res.should.exist
            res.should.be.json
            res.should.have.status(200)
        } catch (err) {
            throw err
        }
    })
    it(' user login', async () => {
        let user = {
            "email": "avrnikh@gmail.com",
            "password": "123",
        }
        try {
            const res = await req.post('/auth/login').send(user)
            res.should.exist
            res.should.be.json
            res.should.have.status(200)
            id = res.body._id
            cookie = res.header['set-cookie'][0]
        } catch (err) {
            throw err
        }
    })
});

