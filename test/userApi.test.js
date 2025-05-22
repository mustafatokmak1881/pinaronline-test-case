const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../app');

describe("Ödül Yönetimi Api Test", () => {
    const testUser = {
        "username": `testUser1`,
        "email": `test1@test.com`,
        "password": "$2b$10$1chZxBp3JUoTJtsMUnbOTOZdnr3Q7fjIyPrjQRoFFphy5wTPzqkAe"
    };

    // Test sonrası temizlik
    after(async () => {
        await chai.request(app)
            .post('/api/users/delete')
            .send({ username: testUser.username });
    });

    describe('/api/users Testing', () => {
        it("Should register user and return 201", async () => {
            const res = await chai.request(app)
                .post('/api/users/register')
                .send(testUser);

            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status', 'success');
            expect(res.body).to.have.property('message', 'user registered');
        });

        it("Should return 409 for duplicate username", async () => {
            const res = await chai.request(app)
                .post('/api/users/register')
                .send(testUser);

            expect(res).to.have.status(409);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status', 'fail');
            expect(res.body).to.have.property('message', 'USERNAME_ALREADY_EXISTS');
        });
        
    });
});