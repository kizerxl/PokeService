const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');

describe('GET /Pokemon/:id', () => {
    it('should return the correct pokemon',(done) => {
        var pokemonName = "Bulbasaur"; 

        request(app)
            .get(`/pokemon/${pokemonName}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.pokemon.pokemonName).toEqual(pokemonName)
            })
            .end(done);
    });

    it('should return 404 if pokemon not found',(done) => {
        var pokemonName = "ThisDoesNotExist"; 

        request(app)
            .get(`/pokemon/${pokemonName}`)
            .expect(404)
            .end(done);
    });
});
