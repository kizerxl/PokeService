var mongoose = require('mongoose');
var PokemonStat = require('./pokemonSpecies')

var Pokemon = mongoose.model('Pokemon', {
    name: {
        type: String, required: true
    },
    pokemonID: {
        type: Number, required: true
    }, 
    types: [
        {type: String, required: true}
    ], 
    hp: {
        type: Number, required: true
    },
    attack: {
        type: Number, required: true
    },
    defense: {
        type: Number, required: true
    },
    spAttack: {
        type: Number, required: true
    },
    spDefense: {
        type: Number, required: true
    },
    speed: {
        type: Number, required: true
    }, 
    generation: {
        type: Number, required: true
    }, 
    legendary: {
        type: Boolean, required: true
    }, 
    species: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'PokemonSpecies', required: true}
    ]
});


module.exports = {Pokemon}