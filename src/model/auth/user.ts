import { MongoClient, Collection } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const client = new MongoClient(uri);

let User: Collection | undefined;

async function getUserCollection() {
  if (!User) {
    await client.connect();
    const db = client.db('Test_db');
    User = db.collection('User');
  }
  return User;
}

export default getUserCollection;