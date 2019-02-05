var mongoose = require('mongoose');

var PokemonSpecies = mongoose.model('PokemonSpecies', {
    speciesID: {
        type: Number
    }, 
    versionID: {
        type: Number
    }, 
    languageId: {
        type: Number
    }, 
    flavorText: {
        type: String
    }
}, 'pokemonDesc');

module.exports = {PokemonSpecies}