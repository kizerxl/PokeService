const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);

describe('GET /Pokemon/:id', (done) => {
    it('Should return the correct pokemon',(done) => {
        var pokemonName = "Bulbasaur"; 

        request(app)
            .get(`/pokemon/${pokemonName}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.pokemonInfo.name).toEqual(pokemonName)
            })
            .end(done);
    });

    it('Should return 404 if pokemon not found',(done) => {
        var pokemonName = "ThisDoesNotExist"; 

        request(app)
            .get(`/pokemon/${pokemonName}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
});
