const db = require('../models/userModel');
const fetch = require("node-fetch");

const userController = {};

// stores location of new user
userController.storeLocation = (req, res, next) => {
  const { city_name } = req.body;
  const text1 = `
          INSERT INTO location (longitude, latitude, city_name)
          values($1, $2, $3)
      `
  const values1 = [null, null, city_name];
  db.query(text1, values1)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  next();
}

// stores user info when a new user signs up
userController.createUser = (req, res, next) => {
  const { email, username, password, first_name, last_name, role, city_name } = req.body;
  const text = `
          INSERT INTO users (email, username, password, first_name, last_name, role, city_name)
          values($1, $2, $3, $4, $5, $6, $7)
      `
  const values = [email, username, password, first_name, last_name, role, city_name];
  db.query(text, values)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  next();
}

// login verification
userController.verifyUser = (req, res, next) => {
  // console.log('req.body: ', req.body)
  const { username, password } = req.body;
  const text = `
          SELECT username
          FROM users
          WHERE username = $1 AND password = $2
  `
  const values = [username, password];
  db.query(text, values)
      .then(response => {
        // console.log('response: ', response)
              if (response.rows[0]) {
                  console.log('User ', response.rows[0].username, ' has been verified');
                  next();
              // if user doesn't exist or username/password is incorrect
              } else {
                  console.log('Username or password is invalid.');
                  res.send('Invalid username or password. Please sign up or try again.');
              }
          })
      .catch(err => console.log(err))
}

// fetch events from Eventbrite
// userController.events = async (req, res, next) => {
//   const url = 'https://www.eventbriteapi.com/v3/events/93399876545/';
//   await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Authorization': 'Bearer CPIOTBKKXSDUDM4MXJBM'
//     },
//   })
//       .then(response => response.json())
//       .then(data => {
//           res.locals.results = data.results;
//       })
//       .catch(err => console.log(err));
//   next();
// }

module.exports = userController;
