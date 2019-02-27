var mongoose = require('mongoose');

var Pokemon = mongoose.model('Pokemon', {
    name: {
        type: String
    },
    pokemonID: {
        type: Number
    }, 
    type1: {
        type: String
    }, 
    type2: {
        type: String
    }, 
    total: {
        type: Number
    },
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
    }
}, 'pokemon');


module.exports = {Pokemon}