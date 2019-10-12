import * as dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  mongo: {
    host: process.env.MONGO_URI,
    name: process.env.MONGO_DB,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
};
