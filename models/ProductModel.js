const mongoose = require('mongoose')
const CharacterSchema = new mongoose.Schema(
   {
      address: {
         type: String,
         required: true
      }
   }
)
const CharacterModel = mongoose.model('character', CharacterSchema)
module.exports = CharacterModel