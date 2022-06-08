const Pool = require('pg').Pool;
const ConfigEnv = require('../config');
const pool = new Pool({
    host: ConfigEnv.HOTSDB,
    database: ConfigEnv.NAMEDB,
    user: ConfigEnv.USERDB,
    password: ConfigEnv.PASSDB,
    port: ConfigEnv.PORTDB,
})

module.exports = {
    pool,
  }