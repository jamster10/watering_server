const config = require('../../config');
const xss = require('xss');

const wateringService = {
  getUserByUserName(db, username){
    return db
      .from('users')
      .where({ username })
      .first();
  },
  createUser(db, newUser){
    return db
      .insert(newUser)
      .into('users')
      .then(([newUserId]) => this.getUserById(db, newUserId));
  },
  getUserById(db, id){
    return db
      .from('users')
      .where({ id })
      .then(([user]) => this.serializeUser(user));
  },
  serializeUser(user) {
    return {
      username: xss(user.username),
      email: xss(user.email),
      phone: xss(user.phone),
      updated_at: user.updated_at,
      created_at: user.created_at,
    };
  },
};

module.exports = wateringService;