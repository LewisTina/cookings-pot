// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

const membersRoutes = require('./routes/membersRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const recipesRoutes = require('./routes/recipesRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');


dotenv.config();
const app = express();
mongoose.set("strictQuery",true);

mongoose.connect(process.env.MONGO_CONNECTION)
.then(()=>console.log("Connexion établie"))
.catch((error)=>console.log("Connection a mongoDB échoué"+error))

const port = 2780;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));


app.use('/members', membersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/comments', commentsRoutes);
app.use('/recipes', recipesRoutes);
app.use('/ingredients', ingredientsRoutes);

app.get('/', (req, res) => {
    res.send('Blog recette Node Js API !!!');
});

app.listen(port, () => {
    console.log(`Serveur à l'écoute sur le port ${port}`);
});
