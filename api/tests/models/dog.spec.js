const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('Deberia arrojar un error si es null', () => {
        Dog.create({})
          .then(()=> {throw "Cannot be null"})
          .catch(e => expect(e.errors[0].path).to.equal('name'))
      });
      it('Deberia funcionar si se le pasa un valor valido', () =>{
        Dog.create({ name: 'pugTesting'})
      })
    });
    describe('id', () =>{
      it('Deberia arrojar un error si es null', () => {
        Dog.create({})
          .then(()=> {throw "Cannot be null"})
          .catch(e => expect(e.errors[0].path).to.equal('id'))
      });
    })
  });
});
