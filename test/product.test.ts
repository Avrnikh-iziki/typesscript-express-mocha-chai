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
let p_id: string;
describe("API: product", () => {

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

    it('create new product', async () => {
        try {
            const pro = {
                "name": "first product second user",
                "title": "iziki",
                "price": 12,
                "desc": "this is what i am doing here",
                "data": [
                    {
                        "name": "string",
                        "date": "Date",
                        "coment": ["string", "string"]
                    },
                    {
                        "name": "string",
                        "date": "Date",
                        "coment": ["string", "string"]
                    }
                ]
            }
            const product = { ...pro, userid: id }
            const res = await req
                .post("/product")
                .send({ product })
                .set({ 'Cookie': `${cookie}` })
            p_id = res.body._id
            res.should.exist
            res.should.be.json
            res.should.be.a('Object')
            res.should.have.status(200)
        } catch (err) {
            throw err
        }
    })
    it("get one user", async () => {
        try {
            const res = await req
                .get(`/product/${p_id}`)
            res.should.exist
            res.should.be.json
            res.body.should.be.a('Object')
            res.error.should.be.equal(false)
            res.body.should.to.include.all.keys('_id', 'name', 'data', 'desc', 'price', 'title', 'userid')
            res.body.data[0].should.to.include.all.keys('name','_id',"coment")
            res.body.should.have.property('_id')
            res.should.status(200)
        } catch (err) {
            throw err
        }
    })
    it('get all user', async () => {
        try {
            const res = await req
                .get("/product")
            res.should.exist
            res.should.be.json
            res.body.should.be.a('Array')
            res.error.should.be.equal(false)
            res.body.should.have.length
            res.should.have.status(200)
        } catch (err) {
            throw err
        }
    })
    it('update user', async () => {
        try {
            const product = {
                "name": "first product updated",
                "title": "iziki",
                "price": 12,
                "desc": "this is what i am doing here",
                "data": [
                    {
                        "name": "string",
                        "date": "Date",
                        "coment": ["string", "string"]
                    },
                    {
                        "name": "string",
                        "date": "Date",
                        "coment": ["string", "string"]
                    }
                ]
            }
            const res = await req
                .patch(`/product/${p_id}`)
                .send({ product })
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
                .delete(`/product/${p_id}`)
                .set({ 'Cookie': `${cookie}` })
            res.should.exist
            res.should.have.status(200)
        } catch (err) {
            throw err
        }
    })
});

