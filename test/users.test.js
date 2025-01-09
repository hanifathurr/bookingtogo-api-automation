// test/api/user.test.js  
const chai = require('chai');  
const chaiHttp = require('chai-http');  
const expect = chai.expect;  
const testData = require('../data/user.json')  
chai.use(chaiHttp);  
  
const baseUrl = 'https://jsonplaceholder.typicode.com';  
  
describe('User API Tests', () => {  
    // Test for GET request  
    it('GET /users should return valid user data with correct data types', (done) => {  
        chai.request(baseUrl)  
            .get('/users')  
            .end((err, res) => {
                // Validate the response status  
                expect(res).to.have.status(200);  
                expect(res.body).to.be.an('array');  
  
                // Validate each user object in response  
                res.body.forEach(user => {  
                    expect(user).to.have.property('id').that.is.a('number');
                    expect(user).to.have.property('name').that.is.a('string');
                    expect(user).to.have.property('username').that.is.a('string');
                    expect(user).to.have.property('email').that.is.a('string');  
                });  
  
                done();  
            });  
    });  
  
    // Test for POST request  
    it('POST /users should create a new user and return the correct response', (done) => {  
  
        chai.request(baseUrl)  
            .post('/users')  
            .send(testData.newUser)  
            .end((err, res) => {  
                expect(res).to.have.status(201);  
                expect(res.body).to.include(testData.newUser); 
                done();  
            });  
    });
});  
