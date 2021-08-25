const server = require('../server.js');
const supertest = require('supertest');
const { sequelize } = require('../models/index.js');
const mockRequest = supertest(server);

describe('AUTH SERVER:', () => {
  
  beforeAll(async () => {
    await sequelize.sync();
    await mockRequest.post('/signup').send({ username: 'cheddar', password: 'cheese' })
  })

  afterAll(async () => {
    await sequelize.drop();
  })

  xit('should create a new user', async() => {
    let results = await mockRequest.post('/signup').send({ username: 'john', password: 'smith' })
    console.log(results.body);
      expect(results.status).toBe(201);
  })

  it('should signin a user', async () => {
    let results = await mockRequest.post('/signin').auth('cheddar', 'cheese')
      expect(results.status).toBe(200);
  })

})