const User = require('../models/User');


async function login(session, username, password) {
    const user = await User.findOne({ username });
    
    if (user && user.comparePassword(password)) {
        session.user = {
            id: user._id,
            username: user.username
        };
        return true;
    }
    else {
        throw new Error('Invalid username or password');
    }
}

async function register(session, username, password) {
    const user = new User({
        username,
        hashedPassword: password
    });
    

    await user.save();
    session.user = {
        id: user._id,
        username: user.username
    };

}

async function logout(session) {
    delete session.user;
}

module.exports = () => (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        res.locals.hasUser = true;
    }
    req.auth = {
        login : (...params) => login(req.session, ...params),
        register: (...params) => register(req.session, ...params),
        logout: () => logout(req.session)
    }

    next();
}