const neo4j = require('neo4j-driver').v1;

// Config
const { NEO_URI, NEO_USER, NEO_PASS } = require('../config/keys');

// Neo4j
const driver = neo4j.driver(NEO_URI, neo4j.auth.basic(NEO_USER, NEO_PASS));
const session = driver.session();

module.exports = { driver, session };
