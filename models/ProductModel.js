const mongoose = require('mongoose');

// Define the schema for the "One Piece" character
const ProductSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minLength: 2,
         maxLength: 50
      },
      role: {
         type: String,
         required: true,
         minLength: 3,
         maxLength: 30
      },
      bounty: {
         type: Number,
         required: true,
         min: [1, 'Bounty cannot be negative'],
         max: 10000000000  // Set a high maximum for the bounty
      },
      devil_fruit: {
         type: String,
         default: null
      },
      crew: {
         type: String,
         required: true,
         minLength: 3,
         maxLength: 50
      },
      image: {
         type: String,
         default: null
      },
      character: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'character'
      }
   },
   {
      versionKey: false
   }
);

// Create the model for the "One Piece" characters
const ProductModel = mongoose.model('products', ProductSchema);

module.exports = ProductModel;
