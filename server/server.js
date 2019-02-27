var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var moongose = require('mongoose');
var {Pokemon} = require('./db/models/pokemon');
var {PokemonSpecies} = require('./db/models/pokemonSpecies');

const app = express();
const port = process.env.PORT || 3000 

moongose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/PokemonDB', {useNewUrlParser: true}, () => {
    console.log("database connection established");
});

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

app.listen(port, () => {
    console.log(`Started service on port ${port}`);
});

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

module.exports = {app};