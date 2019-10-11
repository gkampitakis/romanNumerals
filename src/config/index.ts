import * as dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  mongo: {
    host: `${process.env.MONGO_URL}:${process.env.MONGO_PORT}`,
    name: process.env.MONGO_DB,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
};
