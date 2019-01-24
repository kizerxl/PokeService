var mongoose = require('mongoose');

var PokemonSpecies = mongoose.model('PokemonSpecies', {
    species_id: {
        type: Number, required: true
    }, 
    version_id: {
        type: Number, required: true
    }, 
    language_id: {
        type: Number, required: true
    }, 
    flavor_text: {
        type: String, required: true
    }, 
});

module.exports = {PokemonSpecies}