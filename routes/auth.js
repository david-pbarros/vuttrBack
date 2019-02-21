const express = require('express');
const jwt = require("jwt-simple");

module.exports = function(app) {
    const auth = app.resolvers.auth;
    const router = express.Router();

    router.get("/google", auth.authenticateGoogle());

    router.get('/google/callback', auth.googleCallBack(), function(req, res) {
        req.session.userId = req.user.id; 

        res.json({token: jwt.encode({id: req.user.id}, auth.secret)});
    });

    return router;
}