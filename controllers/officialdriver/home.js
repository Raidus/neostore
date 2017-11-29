const { driver, session } = require('../../models/neo4j');

module.exports = {
  match: async (req, res, next) => {
    const result = await session.run('MATCH (n:Product) RETURN n');

    const productArr = [];

    result.records.forEach(function(record) {
      productArr.push({
        id: record._fields[0].identity.low,
        name: record._fields[0].properties.name
      });
    });

    const result2 = await session.run('MATCH (n:Merchant) RETURN n');

    const merchantArr = [];

    result2.records.forEach(function(record) {
      merchantArr.push(record._fields[0].properties);
    });

    session.close();
    res.render('index', {
      products: productArr,
      merchants: merchantArr
    });
  }
};
