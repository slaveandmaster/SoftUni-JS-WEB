const { Schema, model, Types: {ObjectId}} = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const tripsSchema = new Schema({
    start: {type: String,required: true, minlength:[4, 'Start must be at least 4 characters long']},
    end: {type: String,required: true, minlength:[4, 'End must be at least 4 characters long']},
    date: {type: String,required: true, minlength:[10, 'Date must be 10 characters long'], maxlength:[10, 'Date must be 10 characters long']},
    time: {type: String},
    carImage: {type: String, validate: {
        validator(value) {
            return URL_PATTERN.test(value);
        },
        message: 'Image must be a valid url'
    }},
    carBrand: {type: String,required: true, minlength:[4, 'Brand must be at most 4 characters long']},
    seats: {type: Number, required: true, min:[0, 'Seats must be a positive number between 0 to 4 inclusive'], max:[4, 'Seats must be a positive number between 0 to 4 inclusive']},
    price: {type: Number,required: true, min:[1, 'Price must be a positive number between 1 to 50 inclusive'],max:[50, 'Price must be a positive number between 1 to 50 inclusive']},
    description: {type: String,required: true, minlength:[10, 'Description must be at least 10 characters long']},
    owner: {type: ObjectId, ref: 'User' , require: true},
    buddies: { type: [ObjectId], ref: 'User', default: []},
})

const Trips = model('Trips', tripsSchema);
module.exports = Trips;

// •	Start Point - string (required), 
// •	End Point – string (required),
// •	Date – string (required),
// •	Time – string (required),
// •	Car Image – string (required),
// •	Car Brand – string (required),
// •	Seats – number (required),
// •	Price – number (required),
// •	Description – string (required),
// •	Creator – object Id (reference to the User model),
// •	Buddies – a collection of Users (reference to the User model)
