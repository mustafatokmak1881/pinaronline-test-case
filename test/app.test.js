const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);


const uniqid = require('uniqid')

// Incuding app
const app = require('../app')

describe("Ödül Yönetimi Api Test", () => {
    describe('/api/users Testing', () => {
        it("Should be return 200 and success messages", () => {
            chai.request(app)
                .post('/api/users/register')
                .send({
                    "username": `test-user-${uniqid()}`,
                    "email": `test-mail-${uniqid()}@test.com`,
                    "password": "45y5ujj"
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.an('object');
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body).to.have.property('message', 'user registered');
                });
        })
    })
});