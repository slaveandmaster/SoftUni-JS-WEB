const { Schema, model , Types: {ObjectId}} = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String},
    imageUrl: { type: String, default: 'noImage.jpg'},
    price: { type: Number, required: true , min: 0},
    accessories: {type: [ObjectId], default: [], ref: 'Accessory'},
    owner: {type: ObjectId, ref: 'User'}
});
const Car = model('Car' , carSchema);

module.exports = Car;