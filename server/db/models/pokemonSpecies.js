var mongoose = require('mongoose');

var PokemonSpecies = mongoose.model('PokemonSpecies', {
    species_id: {
        type: Number
    }, 
    version_id: {
        type: Number
    }, 
    language_id: {
        type: Number
    }, 
    flavor_text: {
        type: String
    }
});

module.exports = {PokemonSpecies}