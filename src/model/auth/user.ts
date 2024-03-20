// user.ts
import { MongoClient, Filter } from "mongodb";

const uri = "mongodb+srv://abdout:us9wohyDZ5uxLflT@cluster0.nxwo1gy.mongodb.net/Test_db";
const client = new MongoClient(uri);

async function findOne(query: Filter<unknown>) {
  try {
    await client.connect();

    const database = client.db('test');
    const users = database.collection('users');

    // find the user in the database
    const user = await users.findOne(query);

    return user;
  } finally {
    await client.close();
  }
}

export default {
  findOne,
};