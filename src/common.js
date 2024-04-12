const HOST = process.env.HOST || 'localhost:80'
const PORT = process.env.PORT || 8080
const MONGO_USER = process.env.MONGO_USER || 'lyncare'
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'fls2022'
const MONGO_CLUSTER = process.env.MONGO_CLUSTER || 'lyncare.5ip2vsa.mongodb.net'
const MONGO_DBNAME = process.env.MONGO_DBNAME || 'lawnpeople'
/* eslint-disable prefer-destructuring */

const APP_CONFIG_JSON = JSON.stringify({
  HOST,
  PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_DBNAME,
}).replace(/"/g, '\\"')

module.exports = {
  HOST,
  PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_DBNAME,
  APP_CONFIG_JSON,
}
