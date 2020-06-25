  
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  Recipe: { type: String, required: true },
  Ingredients: { type: String, required: true },
  Procedure: { type: String, required: true },
}, {
  timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;