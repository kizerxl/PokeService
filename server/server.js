require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var moongose = require('mongoose');
var {Pokemon} = require('./db/models/pokemon');
var {PokemonSpecies} = require('./db/models/pokemonSpecies');
var {User} = require('./../server/db/models/user');
var {Favorite} = require('./db/models/favorite');
var {authenticate} = require('./middleware/authenticate');

const app = express();
const _ = require('lodash');
const port = process.env.PORT || 3000 

moongose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/PokemonDB', {useNewUrlParser: true}, () => {
    console.log("database connection established");
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//GET Pokemon
app.get('/pokemon/:name', authenticate, (req, res) => {
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
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    }); 
});

//SignIn 
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

//Login and Signout 
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    }).catch((e) => {
      res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }).catch((err) => {
        res.status(400).send();
    });
});

//Favorites 
app.post('/users/favorites/:name', authenticate, (req, res) => {
    var name = req.params.name 
    Favorite.findOne({'user': req.user._id}).then((favorite)=> {
        var fav = favorite
        if(!fav) { 
            fav = new Favorite({
                user: req.user._id, 
                pokemon: []
            })
        }
        
        fav.pokemon.push(name)
        fav.save().then(() => {
            res.status(200).send();
        });
    })
});

app.get('/users/favorites', authenticate, (req, res) => {
    Favorite.findOne({'user': req.user._id}).then(favorite => {
        if (!favorite) {
            return res.status(200).json({favorites: []});
        }
        res.status(200).send({favorites: favorite.pokemon});
    }).catch(err => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Started service on port ${port}`);
});

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

module.exports = {app};