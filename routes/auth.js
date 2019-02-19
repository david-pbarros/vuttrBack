const express = require('express');
const jwt = require("jwt-simple");

module.exports = function(auth) {
    const router = express.Router();

    router.post("/google", function(req, res) {
        let user = true;
        
        if (user) {
            var payload = {id: 44};
            res.json({token: jwt.encode(payload, auth.secret)});

        } else {
            res.sendStatus(401);
        }
    });

    return router;
}