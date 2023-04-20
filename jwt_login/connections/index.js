const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './.env'})

const database = process.env.NODE_ENV === 'dev'
  ? 'mongodb://localhost:27017/musitix_api'
  : process.env.DATABASE

const DB = database.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

// 連接資料庫
mongoose.connect(DB)
  .then(() => console.log('資料庫連線成功'))
  .catch((error) => console.log(error));
