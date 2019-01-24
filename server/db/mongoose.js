var moongose = require('mongoose');

moongose.Promise = global.Promise;
moongose.connect('mongodb://localhost:27017/PokemonDB');

module.exports = {moongose};
