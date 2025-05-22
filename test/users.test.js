const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../app');

describe("Ödül Yönetimi Api Test", function() {
    this.timeout(5000); // Test timeout'unu artır

    const testUser = {
        "username": `test123User`,
        "email": `test123@test.com`,
        "password": "test123"
    };

    let token;

    before(async () => {
        // Kullanıcı kaydı
        await chai.request(app)
            .post('/api/users/register')
            .send(testUser);
        
        // Token alma
        const loginRes = await chai.request(app)
            .post('/api/users/login')
            .send(testUser);
        
        token = loginRes.body.token;
    });

    after(async () => {
        await chai.request(app)
            .post('/api/users/delete')
            .send({ username: testUser.username });
    });

    describe('Testing for /register api', () => {
        it("Should return 409 for duplicate username", async () => {
            const res = await chai.request(app)
                .post('/api/users/register')
                .send(testUser);

            expect(res).to.have.status(409);
            expect(res.body).to.have.property('status', 'fail');
        });
    });

    describe('Testing for: /login api', () => {
        it('Should return 401 for invalid password', async () => {
            const invalidUser = {...testUser, password: testUser.password + "-invalid"};
            const res = await chai.request(app)
                .post('/api/users/login')
                .send(invalidUser);

            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message', 'Invalid password');
        });

        it('Should return 401 for user not found', async () => {
            const invalidUser = {...testUser, username: testUser.username + "-invalid"};
            const res = await chai.request(app)
                .post('/api/users/login')
                .send(invalidUser);

            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message', 'User not found');
        });
    });

    describe('Testing for: /profile api', () => {
        it('Should return 200 and success message', async () => {
            const res = await chai.request(app)
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${token}`);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Profile Page');
        });

        it('Should return 401 without token', async () => {
            const res = await chai.request(app)
                .get('/api/users/profile');

            expect(res).to.have.status(401);
        });
    });
});