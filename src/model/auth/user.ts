// user.ts
import { connect } from "mongodb-lite";

const uri = "mongodb+srv://abdout:us9wohyDZ5uxLflT@cluster0.nxwo1gy.mongodb.net/Test_db";

async function findOne(query: Record<string, unknown>) {
  const client = await connect(uri);
  const db = client.db('test');
  const users = db.collection('users');

  // find the user in the database
  const user = await users.findOne(query);

  client.close();

  return user;
}

export default {
  findOne,
};