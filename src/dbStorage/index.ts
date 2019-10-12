import { MongoClient, MongoCallback } from 'mongodb';
import { environment, SUPPORTED_NUMERAL_TYPES } from '../config';
import { numeral } from '../interfaces';

class DBStorage {
  public insertDocument(dbCollection: string, document: numeral): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.createConnection(async (err, client) => {
        if (err) return reject(err);
        try {
          const db = client.db(environment.mongo.name);

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
        if (err) return reject(err);
        const db = client.db(environment.mongo.name);

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
    query: SUPPORTED_NUMERAL_TYPES
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.createConnection(async (err, client) => {
        if (err) return reject(err);
        try {
          const db = client.db(environment.mongo.name);

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
    MongoClient.connect(
      environment.mongo.host as string,
      environment.mongo.options,
      callback
    );
  }
}

export default new DBStorage();
