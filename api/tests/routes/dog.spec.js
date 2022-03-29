/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'pug',
  weight: ['1','15'],
  height: ['3','14'],
  temperament: ["Stubborn","Curious","Playful","Adventurous"]
};
const dogPost = {
  name: 'PerroTest',
  weight: ['1','15'],
  height: ['3','14'],
  yearsOfLife: ['1','4'],
  image: 'https://i.pinimg.com/564x/97/f9/30/97f930e29aaae88df17a6acc3577d2ac.jpg',
  temperament: ["Stubborn","Curious","Playful","Adventurous"]
} 

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  // beforeEach(() => Dog.sync({ force: false })
  //   .then(() => Dog.create(dog)));

  describe('GET /dogs', () => {
    it('Deberia devolver status 200', async () =>{
      const res = await agent.get('/dogs');
      expect(res.statusCode).to.equal(200)
    });
    it('Deberia devolver un array de obj', async () => {
      const res = await agent.get('/dogs')
      expect(res.body).to.be.an('Array')
      for(let p of res.body) {
        expect(p).to.be.an('Object')
        expect(p.name).to.be.a('String')
      }
    })
    it('Deberia devolver status 404 cuando se busca un dog que no existe', async () => {
      const res = await agent.get('/dogs/?name=qwerty')
      expect(res.statusCode).to.equal(404)
      expect(res.body).to.be.an('Array').that.is.empty
    })
    it('Deberia devolver status code 200 cuando se busca un dog que existe', async () => {
      const res = await agent.get('/dogs/?name=pug')
      expect(res.statusCode).to.equal(200)
      expect(res.body).to.be.an('Array')
      for (const p of res.body) {
        expect(p).to.be.an('Object')
      }
    })
    it('Deberia devolver status code 200 cuando se busca un dog que existe por ID', async () => {
      const id = 1
      const res = await agent.get(`/dogs/${id}`)
      expect(res.statusCode).to.equal(200)
      expect(res.body).to.be.an('Array')
      for (const p of res.body) {
        expect(p).to.be.an('Object')
        expect(p.id).to.be.equal(id)
      }
    })
    it('Deberia devolver status code 404 cuando se busca un dog que no existe por ID', async () => {
      const id = 123123
      const res = await agent.get(`/dogs/${id}`)
      expect(res.statusCode).to.equal(404)
      expect(res.body).to.be.an('Object')
      expect(res.body.error).to.be.equal(`El perro con ID ${id} no se existe`)
    })
  });
  describe('POST /dogs', () => { 
    it('Deberia devolver status 201', async () => {
      const res = await agent.post('/dogs').send(dogPost)
      expect(res.statusCode).to.equal(201)
      expect(res.body).to.be.an('Object')
    })
    it('Deberia devolver status 400', async () => {
      const res = await agent.post('/dogs').send(dog)
      expect(res.statusCode).to.equal(400)
    })
  })
});
