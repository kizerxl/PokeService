const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {users, populateUsers} = require('./seed/seed');

var {User} = require('./../db/models/user');

beforeEach(populateUsers);

describe('GET /Pokemon/:id', () => {
    it('Should return the correct pokemon',(done) => {
        var pokemonName = "Bulbasaur"; 

        request(app)
            .get(`/pokemon/${pokemonName}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.pokemonInfo.name).toEqual(pokemonName)
            })
            .end(done);
    });

    it('Should return 404 if pokemon not found',(done) => {
        var pokemonName = "ThisDoesNotExist"; 

        request(app)
            .get(`/pokemon/${pokemonName}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('POST /users/favorites/:name', () => {
    it('Should save pokemon successfully by confirming with 200',(done) => {
        var pokemonName = "FakePokemonName"
        request(app)
            .post(`/users/favorites/${pokemonName}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .end(done);   
    });   
});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
          .post('/users/login')
          .send({
            email: users[1].email,
            password: users[1].password
          })
          .expect(200)
          .expect((res) => {
            expect(res.headers['x-auth']).toBeTruthy();
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
    
            User.findById(users[1]._id).then((user) => {
              expect(user.toObject().tokens[1]).toMatchObject({
                access: 'auth',
                token: res.headers['x-auth']
              });
              done();
            }).catch((e) => done(e));
          });
      });
    
      it('should reject invalid login', (done) => {
        request(app)
          .post('/users/login')
          .send({
            email: users[1].email,
            password: users[1].password + '1'
          })
          .expect(400)
          .expect((res) => {
            expect(res.headers['x-auth']).toBeFalsy();
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
    
            User.findById(users[1]._id).then((user) => {
              expect(user.tokens.length).toBe(1);
              done();
            }).catch((e) => done(e));
          });
      });
});

describe('POST /users', (done) => {
    it('should create a user', (done) => {
        var email = 'example@example.com';
        var password = '123mnb!';
    
        request(app)
          .post('/users')
          .send({email, password})
          .expect(200)
          .expect((res) => {
            expect(res.headers['x-auth']).toBeTruthy();
            expect(res.body._id).toBeTruthy();
            expect(res.body.email).toBe(email);
          })
          .end((err) => {
            if (err) {
              return done(err);
            }
    
            User.findOne({email}).then((user) => {
              expect(user).toBeTruthy();
              expect(user.password).not.toBe(password);
              done();
            }).catch((e) => done(e));
          });
      });
    
      it('should return validation errors if request invalid', (done) => {
        request(app)
          .post('/users')
          .send({
            email: 'and',
            password: '123'
          })
          .expect(400)
          .end(done);
      });
    
      it('should not create user if email in use', (done) => {
        request(app)
          .post('/users')
          .send({
            email: users[0].email,
            password: 'Password123!'
          })
          .expect(400)
          .end(done);
      });
});

describe('DELETE /users/me/token', () => {
    it('Should remove auth token on logout', (done) => {
        request(app)
          .delete('/users/me/token')
          .set('x-auth', users[0].tokens[0].token)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
    
            User.findById(users[0]._id).then((user) => {
              expect(user.tokens.length).toBe(0);
              done();
            }).catch((e) => done(e));
          });
      });
});


