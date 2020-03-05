const MongoClient = require("mongodb").MongoClient;

//Connect to mongo
function MongoUtils() {
  const mu = {};

  let hostname = "localhost",
    port = 27017;
  const user = "admin",
    pwd = "secret";

  //Getters and Setters
  mu.dbName = _dbName =>
    _dbName !== undefined ? ((dbName = _dbName), mu) : dbName;
  mu.hostname = _hostName =>
    _hostName !== undefined ? ((hostname = _hostName), mu) : hostname;
  mu.port = _port => (_port !== undefined ? ((port = _port), mu) : port);

  mu.connect = () => {
    console.log("Trying to connect");
    let url;
    if (user === undefined) {
      url = process.env.MONGODB_URI;
    } else {
      url = `mongodb://${hostname}:${port}`;
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
            .finally(() => client.close()); // Returns a promise that will resolve to the list of the collections
      )
      .then(cols => console.log("Collections", cols));
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
            .finally(() => client.close()); // Returns a promise that will resolve to the list of the collections
      )
      .then(dbs => {
        console.log("in", dbs);
        return dbs;
      });
  };
  return mu;
}
const mu = MongoUtils();
module.exports = mu;
