const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
mongoose.set("strictQuery",true);
exports.db = mongoose.connect(process.env.MONGO_CONNECTION)
.then(()=>console.log("Connexion établie"))
.catch((error)=>console.log("Connection a mongoDB échoué"+error))
