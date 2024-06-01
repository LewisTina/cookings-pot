const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient')
const IngredientRecipe = require('../models/IngredientRecipe');
const atob = require('atob');
const jwt = require('jsonwebtoken');

exports.getRecipes = async (req, res) => {
    try {
        const Recipes = await Recipe.find().sort({creationDate: -1});
        res.status(200).json({ 
            data: Recipes
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMemberRecipes = async (req, res) => {
    try {
        const token = req.get("authorization")?.split(' ')[1];
        if(!!token) {
            const decodedToken = jwt.verify(token, 'token');
            const id = decodedToken?.id

            if(!!id) {
                const membre = await Membre.findOne({ _id: id });
                if(!!membre) {
                    const Recipes = await Recipe.find({membreId: membre._id}).sort({creationDate: -1});

                    res.status(200).json({ 
                        data: Recipes
                    });
                }
            } else {
                res.status(401).json({ message: "Credential invalid, action is not authorized" });
            }
        
        } else {
            res.status(500).json({ message: "Credential invalid, action is not authorized" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRecipesByCategoryId = async (req, res) => {
    const Recipes = await Recipe.find({ categoryId: req.params.categoryId }).populate('categoryId ingredients');
    res.json(Recipes);
};

exports.getRecipeById = async (req, res) => {
    const {id} = req.params
    try {
        const recipe = id == "last" 
            ? await Recipe.find().sort({creationDate: -1}).limit(1).then(async (e) => {return e[0]}) 
            : await Recipe.findById(id);

        if(!!recipe) {
            const id = recipe._id
            const ingredientsR = await IngredientRecipe.find({idRecipe: id});
            let ingredients = []

            try {
                if (ingredientsR.length > 0) {
                    ingredients = await Promise.all(ingredientsR.map(async (e) => {
                        const ingredient = await Ingredient.findById(e.idIngredient);
                        if (ingredient) {
                            return {
                                id: e._id,
                                unit: e.unit,
                                quantity: e.quantity,
                                name: ingredient.name,
                                image: ingredient.image
                            };
                        } else {
                            return {
                                id: e._id,
                                unit: e.unit,
                                quantity: e.quantity,
                                name: null,
                                image: null
                            };
                        }
                    }));
                }
            } catch (error) {
                console.error(error);
            } finally {
                res.status(200).json({
                    data: { recipe, ingredients },
                });
            }
        } else {
            res.status(404).json({ 
                message: "Recette introuvable" 
            });
        }
    } catch (err) {
        res.status(404).json({ 
            message: "Recette introuvable" 
        });
    }
};

exports.createRecipe = async (req, res) => {
    const {description, title, files, ingredients, category, steps} = req.body
    const images = files.map(base64String => Buffer.from(atob(base64String), 'binary'));
    const creationDate = new Date()

    try {
        const token = req.get("authorization")?.split(' ')[1];
        if(!!token) {
            const decodedToken = jwt.verify(token, 'token');
            const membreId = decodedToken?.id

            if(!!membreId) {
                const newRecipe = new Recipe({
                    title,
                    description,
                    creationDate,
                    category,
                    images,
                    steps,
                    membreId
                });
        
                const RecipeValue = await newRecipe.save();

                ingredients.map(async (e) => {
                    const newIngredients = new Ingredient({ name: e.title })
                    const ingredient = await newIngredients.save();

                    const newIngredientsRecipe = new IngredientRecipe({ 
                        unit: e.unit, 
                        quantity: e.quantity, 
                        idRecipe: RecipeValue._id,  
                        idIngredient: ingredient._id
                    })

                    await newIngredientsRecipe.save()
                })
                
                res.status(201).json({
                    id: RecipeValue._id, 
                    message: "Enregistrement Réussi"
                });
            } else {
                res.status(401).json({ message: "Credential invalid, action is not authorized" });
            }
        
        } else {
            res.status(500).json({ message: "Credential invalid, action is not authorized" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateRecipe = async (req, res) => {
    const Recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(Recipe);
};

exports.deleteRecipe = async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe supprimée' });
};
