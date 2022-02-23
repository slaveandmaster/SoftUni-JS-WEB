const tripService = require("../services/trip");

function preload(populate) {
  return async function (req, res, next) {
    console.log(req.params);
    const id = req.params.id;
    if (populate) {
      res.locals.trip = await tripService.getTripAndUsers(id);
    } else {
      res.locals.trip = await tripService.getTripsById(id);
    }
    next();
  };
}

module.exports = preload;
