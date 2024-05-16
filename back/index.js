// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const membreRoutes = require('./routes/membreRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const commentaireRoutes = require('./routes/commentaireRoutes');
const recetteRoutes = require('./routes/recetteRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');


dotenv.config();
const app = express();
mongoose.set("strictQuery",true);

mongoose.connect(process.env.MONGO_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Connexion établie"))
.catch((error)=>console.log("Connection a mongoDB échoué"+error))

const port = 3000;

// mongoose.connect('mongodb://localhost:27017/blog-recette', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use('/membres', membreRoutes);
app.use('/categories', categorieRoutes);
app.use('/commentaires', commentaireRoutes);
app.use('/recettes', recetteRoutes);
app.use('/ingredients', ingredientRoutes);

app.listen(port, () => {
    console.log(`Serveur à l'écoute sur le port ${port}`);
});
