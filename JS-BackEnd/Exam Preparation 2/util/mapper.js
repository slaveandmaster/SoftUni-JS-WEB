function mapError(error) {
    if (Array.isArray(error)) {
        return error;
    } else if (error.name == 'ValidationError') {
        return Object.values(error.errors).map(e => ({ msg: e.message}));
    } else if(typeof error.message == 'string') {
        return [{ msg: error.message}];
    } else {
        return [{ msg: 'Request error'}];

    }



}
function tripModelView(trip) {
    return {
        _id: trip._id,
        start: trip.start,
        end: trip.end,
        date: trip.date,
        time: trip.time,
        carImage: trip.carImage,
        carBrand: trip.carBrand,
        seats: trip.seats,
        price: trip.price,
        description: trip.description,
        owner: trip.owner
    }
}
module.exports =  {
tripModelView,
mapError
};