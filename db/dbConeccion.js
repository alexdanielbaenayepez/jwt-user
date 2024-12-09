
const { MongoClient } = require('mongodb');


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'peliculasiud';

async function main() {

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
