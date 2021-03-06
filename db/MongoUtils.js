const MongoClient = require("mongodb").MongoClient;

//Connect to mongo
function MongoUtils() {
  const mu = {};

  let hostname = "localhost",
    port = 27017;
  const user = process.env.MONGO_USER,
    pwd = process.env.MONGO_PWD;

  mu.connect = () => {
    console.log("Trying to connect");
    let url;
    if (user === undefined) {
      url = process.env.MONGODB_URI;
    } else {
      url = `mongodb://${user}:${pwd}@${hostname}:${port}`;
    }
    console.log(url);
    const cliente = new MongoClient(url);
    console.log("Connected");
    return cliente.connect();
  };

  mu.collectionsDb = dbName => {
    return mu
      .connect()
      .then(
        client =>
          client
            .db(dbName)
            .listCollections()
            .toArray()
            .finally(() => client.close()) // Returns a promise that will resolve to the list of the collections
      )
      .then(cols => {
        return cols;
      });
  };

  mu.dbs = () => {
    return mu
      .connect()
      .then(
        client =>
          client
            .db()
            .admin()
            .listDatabases()
            .finally(() => client.close()) // Returns a promise that will resolve to the list of the collections
      )
      .then(dbs => {
        return dbs;
      });
  };

  mu.docsCollectionDb = (dbName, collectionName) => {
    return mu
      .connect()
      .then(
        client =>
          client
            .db(dbName)
            .collection(collectionName)
            .find()
            .sort({ _id: -1 })
            .limit(20)
            .toArray()
            .finally(() => client.close()) // Returns a promise that will resolve to the list of the collections
      )
      .then(docs => {
        return docs;
      });
  };

  mu.lastRecordCollectionDb = (dbName, collectionName) => {
    return mu
      .connect()
      .then(
        client =>
          client
            .db(dbName)
            .collection(collectionName)
            .find()
            .sort({ _id: -1 })
            .limit(1)
            .toArray()
            .finally(() => client.close()) // Returns a promise that will resolve to the list of the collections
      )
      .then(docs => {
        return docs;
      });
  };

  mu.insertNewRecord = (dbName, collectionName, doc) => {
    return mu.connect().then(client => {
      client
        .db(dbName)
        .collection(collectionName)
        .insertOne(doc)
        .finally(() => client.close());
    });
  };
  return mu;
}
const mu = MongoUtils();
module.exports = mu;
