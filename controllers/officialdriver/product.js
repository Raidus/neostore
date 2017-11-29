const { driver, session } = require('../../models/neo4j');

module.exports = {
  addProduct: async (req, res, next) => {
    const name = req.body.name;

    await session.run('CREATE(n:Product {name:{nameParam}}) RETURN n.name', {
      nameParam: name
    });
    session.close();
    res.redirect('/');
  },
  getProduct: async (req, res, next) => {
    const id = req.params.id;

    const result = await session.run(
      'MATCH(a:Product) WHERE id(a)=toInt({idParam}) RETURN a.name as name',
      {
        idParam: id
      }
    );

    const productName = result.records[0].get('name');

    const result2 = await session.run(
      'OPTIONAL MATCH (a:Merchant)-[r:SELLING]-(b:Product) WHERE id(b)=toInt({idParam}) RETURN a.name as name, a.geo as geo',
      { idParam: id }
    );

    const name = result2.records[0].get('name');
    const geo = result2.records[0].get('geo');

    const merchantArr = [];

    result2.records.forEach(record => {
      if (record._fields[0] != null) {
        merchantArr.push({
          name: record._fields[0]
        });
      }
    });
    session.close();
    res.render('product', {
      id: id,
      name: productName,
      selling: merchantArr
    });
  }
};
