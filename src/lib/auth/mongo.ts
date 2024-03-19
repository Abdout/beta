import { MongoClient } from 'mongodb';
import { MongoClientOptions } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
const mongoUri = process.env.MONGODB_URI || ''; // Provide a default value if MONGODB_URI is undefined
const client = new MongoClient(mongoUri, {
} as MongoClientOptions);

let clientPromise: any;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;