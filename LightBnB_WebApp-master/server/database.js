//------------------------------------------
// npm run local
// user passwords is 'password'
//------------------------------------------

//------------------------------------------
// Import Required  
// const properties = require('./json/properties.json');
const users = require('./json/users.json');
//------------------------------------------

//------------------------------------------
// Create Connection to Lightbnb Database
const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
//------------------------------------------

//------------------------------------------
// Test to Ensure Database Connection
// pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response.rows)});
//------------------------------------------


//------------------------------------------
/// Users Functions - w/ Email
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

/*
  let user;
  for (const userId in users) {
    user = users[userId];
    if (user.email.toLowerCase() === email.toLowerCase()) {
      break;
    } else {
      user = null;
    }
  }
  return Promise.resolve(user);
*/

  const queryString = `
  SELECT *
  FROM users
  WHERE email iLIKE $1
  `;

  const valuesProperties = [email];

  return pool.query(queryString, valuesProperties)
  .then(res => {
    console.log(res.rows[0]);
    return Promise.resolve(res.rows[0]);
  })
  .catch(err => console.error('querry error', err.message));
};
exports.getUserWithEmail = getUserWithEmail;
//------------------------------------------

//------------------------------------------
/// Users Functions - w/ id
/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // return Promise.resolve(users[id]);
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1
  `;

  const valuesProperties = [id];

  return pool.query(queryString, valuesProperties)
  .then(res => {
    console.log(res.rows[0]);
    return Promise.resolve(res.rows[0]);
  })
  .catch(err => console.error('querry error', err.message));
};
exports.getUserWithId = getUserWithId;
//------------------------------------------

//------------------------------------------
/// Users Functions - New User
/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  /*
  const userId = Object.keys(users).length + 1;
  user.id = userId;
  users[userId] = user;
  return Promise.resolve(user);
  */

  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `;

  const valuesProperties = [user.name, user.email, user.password];

  return pool.query(queryString, valuesProperties)
  .then(res => {
    console.log(res.rows[0]);
    return Promise.resolve(res.rows[0]);
  })
  .catch(err => console.error('querry error', err.message));
}
exports.addUser = addUser;
//------------------------------------------


//------------------------------------------
/// Reservations
/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  // return getAllProperties(null, 2);

  const queryString = `
  SELECT properties.*, reservations.*
  FROM properties
  JOIN reservations ON reservations.property_id = properties.id
  JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.start_date, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2
  `;

  const valuesProperties = [guest_id, limit];

  return pool.query(queryString, valuesProperties)
  .then(res => {
    console.log(res.rows);
    return Promise.resolve(res.rows);
  })
  .catch(err => console.error('querry error', err.message));
};
exports.getAllReservations = getAllReservations;
//------------------------------------------


//------------------------------------------
/// Properties
/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
/*
  const limitedProperties = {};
  for (let i = 1; i <= limit; i++) {
    limitedProperties[i] = properties[i];
  }
  return Promise.resolve(limitedProperties);
*/

  const queryString = `
  SELECT *
  FROM properties
  LIMIT $1
  `;

  const valuesProperties = [limit];

  return pool.query(queryString, valuesProperties)
  .then(res => {
    // console.log(res.rows);
    return res.rows;
  })
  .catch(err => console.error('querry error', err.message));
};
exports.getAllProperties = getAllProperties;
//------------------------------------------


//------------------------------------------
/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
//------------------------------------------
