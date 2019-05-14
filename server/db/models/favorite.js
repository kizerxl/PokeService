var mongoose = require('mongoose');

var FavoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
    pokemon: {
      type: [String]
    }
});

var Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = {Favorite}