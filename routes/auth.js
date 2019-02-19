const express = require('express');
const jwt = require("jwt-simple");

module.exports = function(auth) {
    const router = express.Router();

    router.get("/google", auth.authenticateGoogle());

    /*router.get("/google", function(req, res) {
        let user = true;
        
        if (user) {
            var payload = {id: 44};
            res.json({token: jwt.encode(payload, auth.secret)});

        } else {
            res.sendStatus(401);
        }
    });*/

    router.get('/google/callback', auth.googleCallBack(), function(req, resp) {
        resp.send("passou");
    });

    return router;
}