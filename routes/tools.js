const express = require('express');

module.exports = function(app) {
  const auth = app.resolvers.auth;  
  const router = express.Router();

    router.get("/", auth.authenticateJWT(), function(req, res) {
        res.json(app.resolvers.tool.list(req.query.tag));
    });

    router.post('/', auth.authenticateJWT(), function(req, res) {
        let title = req.body.title;
        let link = req.body.link;
        let description = req.body.description;
        let tags = req.body.tags;

        res.status(201).json({
            title: title,
            link: link,
            description: description,
            tags: tags,
            id: 1
        });
    });

    router.delete('/:id', auth.authenticateJWT(), function(req, res) {
        let id = req.params.id;

        res.sendStatus(202);
    });

    return router;
}