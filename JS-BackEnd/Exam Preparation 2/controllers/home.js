const { isUser } = require('../middleware/guard');
const preload = require('../middleware/preload');
const { getTrips, getTripsByUser } = require('../services/trip');
const { tripModelView } = require('../util/mapper');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home page'});
})

router.get('/catalog', async (req,res) => {
    const trips = (await getTrips()).map(tripModelView);
    res.render('shared-trips', {title: 'Offer Trip List', trips});
    
})

router.get('/catalog/:id', preload(true), async (req,res) => {
    if (req.session.user) {
        res.locals.trip.hasUser = true;
        res.locals.trip.isOwner = req.session.user._id == res.locals.trip.owner._id;
        res.locals.trip.isBuddie = res.locals.trip.buddies.find(v => v._id == req.session.user._id) != undefined;
        if (res.locals.trip.seats >= 1) {
            res.locals.trip.hasSeats = true;
        }
        
    }
     res.render('trip-details', {title: 'Details'});
    
})


router.get('/profile/', isUser(), async (req, res) => {
    const tripsByUser = await getTripsByUser(res.locals.user._id);
    res.locals.user.tripCount = tripsByUser.length;
    res.locals.user.trips = tripsByUser;
       res.render('profile',{ title: 'Profile page'})
} )

module.exports = router;