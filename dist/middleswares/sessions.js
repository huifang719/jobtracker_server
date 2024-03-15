import expressSession from 'express-session';
const sessions = expressSession({
    key: 'user-sid',
    secret: process.env.REACT_APP_EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
});
export default sessions;
