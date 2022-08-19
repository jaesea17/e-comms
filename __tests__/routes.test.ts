import { app } from '../src/app'
import request from 'supertest'

describe("test users endpoints", () => {
    it("test get all users", async () => {
        const res = await request(app).get('/api/user/read')
        expect(res.status).toBe(200);
    })
    it("post user", async () => {
        const res = await request(app).post('/api/user/create').send({
            fullname: "puneeth",
            email: "punh@gmail.com",
            gender: "m",
            phone: "+1234567891234",
            address: "the white house",
            password: "1234567"

        })
        expect(res.status).toBe(400)

    })
    it("post user gives error for unique email", async () => {
        const res = await request(app).post('/api/user/create').send({
            fullname: "puneeth",
            email: "punh@gmail.com",
            gender: "m",
            phone: "+1234567891234",
            address: "the white house",
            password: "1234567"

        })
        expect(res.status).toBe(400)

    })
    it("test check user not verified", async () => {
        const res = await request(app)
            .get('/api/user/userId')
            .send({
                userId: 1
            })
        expect(res.status).toBe(404)
    })

})