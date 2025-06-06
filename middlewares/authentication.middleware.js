module.exports.requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized - Please login first' });
    }
    next();
};