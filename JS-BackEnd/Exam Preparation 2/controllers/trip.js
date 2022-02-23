const { isUser, isOwner } = require('../middleware/guard');
const preload = require('../middleware/preload');
const { createTrip, joinTrip, updateTrip, deleteTrip } = require('../services/trip');
const {mapError} = require('../util/mapper');

const router = require('express').Router();

router.get('/create', isUser(), (req,res) => {
    res.render('trip-create', {title: 'Create new Offer Trip'});
});

router.post('/create', isUser(), async (req, res) => {
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
        owner: req.session.user._id
    }
    try {
        await createTrip(trip);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        const errors = mapError(error);
        res.render('trip-create', {title: 'Create new Offer Trip', trip, errors})
    }
})

router.get('/join/:id', preload(), isUser(), async (req, res)=> {
    const id = res.locals.trip._id;
    const userId = req.session.user._id;
    const value = 1;
    try {
        await joinTrip(id, userId, value);
        res.redirect('/catalog/' + id);
    } catch (error) {
        const errors = mapError(error)
        res.render('trip-details', {title: 'Trip Details', errors})
    }


})

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('trip-edit', {title: 'Edit Offer'});
})

router.post('/edit/:id', preload(), isOwner(), async (req, res)=> {
    const id = req.params.id;
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
    }

    try {
        await updateTrip(id , trip);
        res.redirect('/catalog/' + id);
    } catch (error) {
        console.log(error);
        const errors = mapError(error);
        trip._id = id;
        res.render('trip-edit', {title: 'Edit Offer', trip, errors});
    }
})

router.get('/delete/:id', preload(), isOwner(), async (req, res)=> {
    await deleteTrip(req.params.id);
    res.redirect('/catalog');
})

module.exports = router;