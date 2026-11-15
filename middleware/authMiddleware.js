// Check whether a user is logged in
function requireAuth(req, res, next) {
    if (!req.session || !req.session.userId) {
        return res.redirect('/login');
    }

    next();
}

// Check whether a user is an administrator
function requireAdmin(req, res, next) {
    if (!req.session || req.session.userRole !== 'admin') {
        return res.status(403).send('Access denied. Administrators only.');
    }

    next();
}

module.exports = {
    requireAuth,
    requireAdmin
};