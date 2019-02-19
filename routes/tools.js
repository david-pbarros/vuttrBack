const express = require('express');

module.exports = function(auth) {
    const router = express.Router();

    router.get("/", auth.authenticate(), function(req, res) {
        let tag = req.query.tag;

        console.log(req);

        res.json([
            {
              "title": "hotel",
              "link": "https://github.com/typicode/hotel",
              "description": "Local app manager. Start apps within your browser",
              "tags": [
                tag
              ],
              "id": 1
            }
          ]);
    });

    router.post('/', function(req, res) {
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

    router.delete('/:id', function(req, res) {
        let id = req.params.id;

        res.sendStatus(202);
    });

    return router;
}