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
          await db.collection(dbCollection).insertOne(document);

          resolve();
        } catch (error) {
          reject(error);
        }
        client.close();
      });
    });
  }

  public retrieveDocument(
    dbCollection: string,
    document: numeral
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.createConnection(async (err, client) => {
        if (err) reject(err);
        try {
          const db = client.db(environment.mongo.name);
          const doc = await db.collection(dbCollection).findOne(document);

          resolve(doc);
        } catch (error) {
          reject(error);
        }
        client.close();
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

          resolve();
        } catch (error) {
          reject(error);
        }
        client.close();
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

          const filter: any = {};
          filter[query] = 1;

          const doc = await db
            .collection(dbCollection)
            .find(
              {},
              {
                fields: filter
              }
            )
            .sort({ arabic: 1 })
            .toArray();
          resolve(doc);
        } catch (error) {
          reject(error);
        }
        client.close();
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
