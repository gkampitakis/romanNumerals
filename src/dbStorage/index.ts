import { MongoClient, MongoCallback } from 'mongodb';
import config from '../config';
import { numeral } from '../interfaces';

class DBStorage {
  public insertDocument(dbCollection: string, document: numeral): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.createConnection(async (err, client) => {
        if (err) reject(err);
        try {
          const db = client.db(config.mongo.name);

          const doc = await db.collection(dbCollection).findOne(document);
          if (!doc) await db.collection(dbCollection).insertOne(document);

          client.close();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  public removeDocuments(dbCollection: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.createConnection(async (err, client) => {
        if (err) reject(err);
        const db = client.db(config.mongo.name);

        try {
          await db.collection(dbCollection).deleteMany({});
          client.close();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  public retrieveDocuments(
    dbCollection: string,
    query: 'Arabic' | 'Roman'
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.createConnection(async (err, client) => {
        if (err) reject(err);
        try {
          const db = client.db(config.mongo.name);

          const doc = await db
            .collection(dbCollection)
            .find({ type: query })
            .toArray();
          client.close();
          resolve(doc);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  private createConnection(callback: MongoCallback<MongoClient>) {
    MongoClient.connect(config.mongo.host, config.mongo.options, callback);
  }
}

export default new DBStorage();
