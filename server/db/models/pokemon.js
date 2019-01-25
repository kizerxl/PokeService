var mongoose = require('mongoose');
var PokemonStat = require('./pokemonSpecies')

var Pokemon = mongoose.model('Pokemon', {
    name: {
        type: String
    },
    pokemonID: {
        type: Number
    }, 
    types: [
        {type: String}
    ], 
    hp: {
        type: Number
    },
    attack: {
        type: Number
    },
    defense: {
        type: Number
    },
    spAttack: {
        type: Number
    },
    spDefense: {
        type: Number
    },
    speed: {
        type: Number
    }, 
    generation: {
        type: Number
    }, 
    legendary: {
        type: String
    }, 
    species: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'PokemonSpecies'}
    ]
});


module.exports = {Pokemon}