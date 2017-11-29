const { driver, session } = require('../../models/neo4j');

module.exports = {
  connect: async (req, res) => {
    const name1 = req.body.name1;
    const name2 = req.body.name2;
    const id = req.body.id;

    const result = await session.run(
      'MATCH(a:Merchant {name:{nameParam1}}),(b:Product {name:{nameParam2}}) MERGE(a)-[r:SELLING]->(b) RETURN a,b',
      { nameParam1: name1, nameParam2: name2 }
    );
    session.close();
    if (id && id != null) {
      res.redirect('/product/' + id);
    } else {
      res.redirect('/');
    }
  }
};
