const pokemonDescriptionsPath =  __dirname + "/pokemonDescriptions.csv";
const pokemonPath = __dirname + "/pokemon.csv";
const csv = require('csvtojson');

var {mongoose} = require('./../server/db/mongoose');
var {Pokemon} = require('./../server/db/models/pokemon');
var {PokemonSpecies} = require('./../server/db/models/pokemonSpecies');

var parse = () => {
    parseAndPopulateDB(pokemonPath, "Pokemon");
    parseAndPopulateDB(pokemonDescriptionsPath, "Pokemon Descriptions");
}; 

var parseAndPopulateDB = (path, nameOfFile) => {
     csv()
     .fromFile(path)
     .then((res)=>{     
            if(nameOfFile === "Pokemon") {
                res.forEach(mon => {
                    var pokemon = new Pokemon({
                        name: mon.Name,
                        pokemonID: mon.Num,
                        types: [
                            mon.Type1,
                            mon.Type2
                        ], 
                        hp: mon.Hp,
                        attack: mon.Attack,
                        defense: mon.Defense,
                        spAttack: mon.SpAtk,
                        spDefense: mon.SpDef,
                        speed: mon.Speed,
                        generation: mon.Generation, 
                        legendary: mon.Legendary
                    });
                    pokemon.save().then((pokemon)=> {
                        console.log(`saved file ${pokemon.name}`);
                    });
                });
            } else {
                res.forEach(mon => {
                    var species = new PokemonSpecies({
                        species_id: mon.species_id,
                        version_id: mon.version_id,
                        language_id: mon.language_id,
                        flavor_text: mon.flavor_text
                    });
                    species.save().then((species)=> {
                        console.log(`saved file ${species.name}`);
                    });
                });
            }
        });
}

module.exports = {parse};


