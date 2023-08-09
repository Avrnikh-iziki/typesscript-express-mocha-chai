import "dotenv/config"
import chaiHttp from 'chai-http'
import chai from "chai"
import App from "../src/app/index"
const should = chai.should()
const expect = chai.expect
const DB_url: string = `${process.env.URL_TEST}`
chai.use(chaiHttp)

const server = new App(DB_url).app
const req = chai.request(server).keepOpen()
let cookie: string;
let id: string;
describe("API: user", () => {
    before(async () => {
        let user = {
            "email": "avrnikh@gmail.com",
            "password": "123",
        }
        try {
            const res = await req
                .post('/auth/login')
                .send(user);
            cookie = res.header['set-cookie'][0]
            id = res.body._id
        }
        catch (err) {
            throw (err)
        }
    })

    it('get all user from database', async () => {
        try {
            const res = await req
                .get("/user")
                .set({ 'Cookie': `${cookie}` })
            res.should.exist
            res.should.be.json
            res.should.be.a('Object')
            res.should.have.status(200)
        } catch (err) {
            throw err
        }
    })
    it('update user', async () => {
        try {
            const res = await req
                .patch(`/user/${id}`)
                .send({ username: "updated username" })
                .set({ 'Cookie': `${cookie}` })
            res.should.exist
            res.should.be.json
            res.should.be.a('Object')
            res.should.have.status(200)
        } catch (err) {
            throw err
        }
    })
    it('delete user', async () => {
        try {
            const res = await req
                .delete(`/user/${id}`)
                .set({ 'Cookie': `${cookie}` })
            res.should.exist
            res.should.be.json
            res.should.be.a('Object')
            res.should.have.status(200)
        } catch (err) {
            throw err
        }
    })
});

