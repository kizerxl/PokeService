var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {Pokemon} = require('./db/models/pokemon');
var {PokemonSpecies} = require('./db/models/pokemonSpecies');

const app = express();
const parseCSV = require('./../playground/parseCSV.js');

app.get('/pokemon/:name', (req, res) => {
    var name = req.params.name
    Pokemon.findOne({'name': name.capitalize()})
    .then(pokemon => {
        if(!pokemon) {
            return res.status(404).json({
                message: "Entry not found"
            });
        }

        PokemonSpecies.find({'speciesID': pokemon.pokemonID})
        .then(species => {
            res.status(200).send({pokemonInfo: pokemon, speciesInfo: species});
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    }); 
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

module.exports = {app};