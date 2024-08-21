const mongoose = require('mongoose');

// Định nghĩa schema cho Car
const carSchema = new mongoose.Schema({
   brand: {
      type: String,
      required: true,
   },
   model: {
      type: String,
      required: true,
   },
   year: {
      type: Number,
      required: true,
      min: 0
   },
   color: {
      type: String,
      required: true,
   },
   engine: {
      type: String,
      required: false,
   },
   owner: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: false,
   },
   registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Registration' // Tham chiếu đến một collection khác
   }
}, {
   versionKey: false
});

// Đăng ký model Car
const CarModel = mongoose.model('car', carSchema);
module.exports = CarModel;
