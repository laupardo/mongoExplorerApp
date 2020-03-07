var express = require("express");
var router = express.Router();
const mu = require("../db/MongoUtils.js");

router.get("/", function(req, res) {
  mu.dbs()
    .then(dbs => {
      const databases = dbs.databases;
      return res.render("index", { dbs: databases });
    })
    .catch(err => console.log(err));
});

router.get("/getCollections/:db", function(req, res) {
  mu.collectionsDb(req.params.db)
    .then(col => {
      return res.json(col);
    })
    .catch(err => console.log(err));
});

router.get("/getDocs/:db/:col", function(req, res) {
  console.log(req.params.db);
  mu.docsCollectionDb(req.params.db, req.params.col)
    .then(docs => {
      return res.json(docs);
    })
    .catch(err => console.log(err));
});

router.get("/getNewest/:db/:col/", function(req, res) {
  mu.lastRecordCollectionDb(req.params.db, req.params.col)
    .then(docs => {
      return res.json(docs);
    })
    .catch(err => console.log(err));
});

router.post("/newDoc", (req, res) => {
  console.log("boday", req.body.db);
  let db = req.body.db;
  let col = req.body.col;
  let doc = req.body.doc;
  mu.insertNewRecord(db, col, doc)
    .then(res => res.sendStatus(200))
    .catch(err => console.log(err));
});

router.get("/surprise", function(req, res) {
  return res.render("surprise");
});
module.exports = router;
