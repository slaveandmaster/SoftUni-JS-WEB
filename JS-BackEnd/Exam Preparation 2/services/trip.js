const Trip = require("../models/Trips");
//const Trip = require("../models/Users");

async function getTrips() {
      return Trip.find({}).lean();
}

async function getTripsByUser(userId) {
  return Trip.find({owner: userId}).lean();
}
async function getTripsById(id) {
    return Trip.findById(id).populate('owner').lean();
}

async function getTripAndUsers(id) {
  return Trip.findById(id).populate('owner').populate('buddies').lean();
}

async function createTrip(trip) {
    const result = new Trip(trip);
    await result.save();
   // return result;

  //  //second model
  //   const user = User.findById(result.owner);
  //   user.trips.push(result._id);
  //   await user.save(); //posle populate na tablicata za da izvedem tripovete v profila

}

async function updateTrip(id, trip) {
  const existing = await Trip.findById(id);
 
  existing.start = trip.start;
  existing.end = trip.end;
  existing.date = trip.date;
  existing.time = trip.time;
  existing.carImage = trip.carImage;
  existing.carBrand = trip.carBrand;
  existing.seats = trip.seats;
  existing.price = trip.price;
  existing.description = trip.description;

  await existing.save();
}

async function deleteTrip(id) {
   await Trip.findByIdAndDelete(id);
}
async function joinTrip(tripId, userId, value) {
  const trip = await Trip.findById(tripId);
  
  if (trip.buddies.includes(userId)) {
      throw new Error('Username already joined!');
  }
  trip.buddies.push(userId);
  trip.seats -= value;
  await trip.save();

}
module.exports = {
  getTrips,
  getTripsById,
  getTripsByUser,
  getTripAndUsers,
  createTrip,
  updateTrip,
  deleteTrip,
  joinTrip
};
