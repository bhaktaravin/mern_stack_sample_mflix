require('dotenv').config({ path: '../.env' });
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const email = 'conleth_hill@gameofthron.es'; // change this
const newPassword = 'password123';           // change this

(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('sample_mflix');
  const hash = await bcrypt.hash(newPassword, 10);
  const result = await db.collection('users').updateOne(
    { email },
    { $set: { password: hash } }
  );
  console.log(result.modifiedCount ? 'Password updated' : 'User not found');
  await client.close();
})();
