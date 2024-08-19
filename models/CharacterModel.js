const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
   address: {
      type: String,
      required: true
   }
});

// Đổi tên model từ 'character' thành 'Character'
const CharacterModel = mongoose.model('Characters', CharacterSchema);

module.exports = CharacterModel;
