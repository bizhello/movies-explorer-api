const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('HELLO men');
})

async function main() {
  // await mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
  // console.log('connected to db');
  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();