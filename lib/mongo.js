const { MongoClient, ObjectId } = require("mongodb");
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

  async getOne(collection, id) {
    const db = await this.connect();
    return await db.collection(collection).findOne({ _id: ObjectId(id) });
  }

  async createOne(collection, data) {
    const db = await this.connect();
    const result = await db.collection(collection).insertOne(data);
    return result.insertedId;
  }

  async updateOne(collection, id, data) {
    const db = await this.connect();
    const result = await db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, data);

    return result.upsertedId;
  }

  async deleteOne(collection, id) {
    const db = await this.connect();
    const result = await db
      .collection(collection)
      .deleteOne({ _id: ObjectId(id) });

    return result.deletedCount;
  }
}

module.exports = MongoLib;
