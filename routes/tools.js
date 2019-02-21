const express = require('express');

module.exports = function(app) {
  const auth = app.resolvers.auth;  
  const router = express.Router();

  router.get("/", auth.authenticateJWT(), async function(req, res) {
    res.json(await app.resolvers.tool.list(req.query.tag));
  });

  router.post('/', auth.authenticateJWT(), async function(req, res) {
    try {
      res.status(201).json(await app.resolvers.tool.create(req.body));

    } catch (exception) {
      app.resolvers.error.send(res, 400, "Bad Request", exception.message);
    }
  });

  router.delete('/:id', auth.authenticateJWT(), async function(req, res) {
    if (await app.resolvers.tool.delete(req.params.id)) {
      res.sendStatus(200);

    } else {
      app.resolvers.error.send(res, 404, "Not Found", "Não foi possível remover o registro!");
    }
  });

  return router;
}