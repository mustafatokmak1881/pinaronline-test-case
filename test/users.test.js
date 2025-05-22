const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../app');

describe("Ödül Yönetimi Api Test", () => {
    const testUser = {
        "username": `test123User`,
        "email": `test123@test.com`,
        "password": "test123"
    };

    // Test sonrası temizlik
    after(async () => {
        await chai.request(app)
            .post('/api/users/delete')
            .send({ username: testUser.username });
    });

    describe('Testing for /register api', () => {
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

    describe('Testing for: /login api', () => {
        it('Should return 200 and get token', async () => {
            chai.request(app)
                .post('/api/users/login')
                .send(testUser)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.an('object');
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body).to.have.property('message', 'Access granted');
                    expect(res.body.token).to.have.a('string')
                });
        });

        it('Should return 401 and invlaid password message', async () => {
            let invalidUser = testUser;
            invalidUser.password = testUser.password + "-invalid";

            chai.request(app)
                .post('/api/users/login')
                .send(invalidUser)
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    expect(res).to.have.an('object');
                    expect(res.body).to.have.property('status', 'fail');
                    expect(res.body).to.have.property('message', 'Invalid password');
                });
        });

        it('Should return 401 and user not found message', async () => {
            let invalidUser = testUser;
            invalidUser.username = testUser.username + "-invalid";

            chai.request(app)
                .post('/api/users/login')
                .send(invalidUser)
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    expect(res).to.have.an('object');
                    expect(res.body).to.have.property('status', 'fail');
                    expect(res.body).to.have.property('message', 'User not found');
                });
        });
    })
});