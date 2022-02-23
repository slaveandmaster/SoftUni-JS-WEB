const router = require('express').Router();
const { isGuest, isUser } = require('../middleware/guard');
const { register, login } = require('../services/user');
const mapError = require('../util/mapper');

router.get('/register', isGuest() , (req, res) => {
    res.render('register')
});
//TODO check from action ,method, filed names
router.post('/register', isGuest() ,async (req, res) => {
    try {
        if (req.body.password.trim() == "") {
            throw new Error("Password is required");
          } else if (req.body.password != req.body.repeatPassword) {
            throw new Error('Password don\`t match')
        }
        console.log(req.body)
         const user = await register(req.body.email, req.body.password, req.body.gender);
         req.session.user =  user;
         //TODO check redirect requirement from exam description
         res.redirect('/'); 
    } catch (error) {
        //TODO send error messages
        const errors = mapError(error);
        const isMale = req.body.gender == 'male';
        
        res.render('register', { data: { email: req.body.email , isMale }, errors})
    }
})
router.get('/login', isGuest() , (req, res) => {
    res.render('login')
});
router.post('/login', isGuest() , async (req, res) => {
    try {
        if (req.body.password.trim() == "" || req.body.email.trim() == "") {
            throw new Error("Email and Password is required"); 
        } else {
            const user = await login(req.body.email, req.body.password);
            req.session.user = user;
            res.redirect("/");
    
        }
    } catch (error) {
        //TODO send error messages
        const errors = mapError(error);
        res.render('login', { data: { email: req.body.email }, errors})
    }
})

router.get('/logout', isUser() , (req,res) => {
    delete req.session.user;
    //TODO check redirect requirements from exam description
    res.redirect('/');
})
module.exports = router;