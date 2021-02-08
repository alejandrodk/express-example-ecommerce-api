const { MongoClient } = require("mongodb");
const { config } = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPass);
const HOST = config.dbHost;
const PORT = config.dbPort;
const DB_NAME = config.dbName;

const MONGO_URI = config.dbUri;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.connection = null;
    this.dbName = DB_NAME;
  }

  async connect() {
    if (!MongoLib.connection) {
      await this.client.connect();
      console.log("Connection successfully");
      this.connection = this.client.db(this.dbName);
    }
    return this.connection;
  }

  async getAll(collection, query) {
    const db = await this.connect();
    return await db.collection(collection).find(query).toArray();
  }
}

module.exports = MongoLib;