const { driver, session } = require('../../models/neo4j');

module.exports = {
  add: async (req, res, next) => {
    const name = req.body.name;
    const geo = req.body.geo;

    const result = await session.run(
      'CREATE(n:Merchant {name:{nameParam}, geo:{geoParam}}) RETURN n',
      {
        nameParam: name,
        geoParam: geo
      }
    );

    session.close();
    res.redirect('/');
  }
};
