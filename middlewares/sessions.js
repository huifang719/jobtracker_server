const expressSession = require('express-session')

const sessions = expressSession({
    key: 'user-sid',
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60}
})

module.exports = sessions