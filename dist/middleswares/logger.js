const logger = (req, res, next) => {
    console.log(`${new Date()} ${req.method} ${req.path}`);
    next();
};
export default logger;
