const dotenv = require('dotenv');
const envFound = dotenv.config();
if(!envFound){
    throw new Error('Coud not found .env File');
}
module.exports={
    databaseURL:process.env.databaseURL,
    SECRET_ACCESS_KEY:process.env.SECRET_ACCESS_KEY,
    ACCESS_KEY_ID:process.env.ACCESS_KEY_ID,
    JWT_SECRET: process.env.JWT_SECRET, //process.env.JWT_SECRET
}