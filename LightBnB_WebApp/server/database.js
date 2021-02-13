const properties = require('./json/properties.json');
const users = require('./json/users.json');
const bcrypt = require('bcrypt');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool.query(
    `SELECT *
    FROM users
    WHERE email = $1`,
    [email])
    .then(res => res.rows[0]);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool.query(
    `SELECT *
    FROM users
    WHERE id = $1`,
    [id])
    .then(res => res.rows[0])
    .catch(err => {
      console.log(err);
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3) RETURNING *;
  `, [user.name, user.email, user.password])
    .then(res => res.rows[0]);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const params = [guest_id, limit];
  const queryString =
    `SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`;

  // @ts-ignore
  return pool.query(queryString, params)
    .then(res => res.rows);
};
exports.getAllReservations = getAllReservations;

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryString += queryParams.length > 0 ? `AND` : `WHERE`;
    queryParams.push(`%${options.city}%`);
    queryString +=` city ILIKE $${queryParams.length} `
  }
  
  if (options.owner_id) {
    queryString += queryParams.length > 0 ? `AND` : `WHERE`;
    queryParams.push(options.owner_id);
    queryString += ` owner_id = $${queryParams.length} `;
  } 
  
  if (options.minimum_price_per_night ) {
    queryString += queryParams.length > 0 ? `AND` : `WHERE`;
    queryParams.push(options.minimum_price_per_night);
    queryString += ` cost_per_night >= $${queryParams.length} `
  }

  if(options.maximum_price_per_night) {
  queryString += queryParams.length > 0 ? `AND` : `WHERE`;
  queryParams.push(options.maximum_price_per_night);
  queryString += ` cost_per_night <= $${queryParams.length} `
  }

  queryString += `
  GROUP BY properties.id`
  
  
  if (options.minimum_rating) { 
    queryParams.push(options.minimum_rating);
    queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length} `
  }
  
  // 4
  queryParams.push(limit);
  queryString += ` ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  // 5
  console.log(queryString, queryParams);
  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => console.error(err.message))
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {

// INSERT INTO properties (title, description, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street, country, city, province, post_code, owner_id)
};
exports.addProperty = addProperty;
