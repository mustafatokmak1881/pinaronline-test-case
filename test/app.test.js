const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);


// Incuding app
const app = require('../app')

describe("Ödül Yönetimi Api Test", () => {
    describe("Home Route Test", () => {
        it('Should be return 200 and home page message', () => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.text).to.equal('Home Page')
                });
        })
    })
});