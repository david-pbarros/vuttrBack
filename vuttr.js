(function () {
    "use strict";

    const app = require('./expressInit')();
    const router = require('express').Router();
    const path = require('path');

    app.use(app.resolvers.auth.initialize());
    app.use(app.resolvers.auth.session());

    router.get("/", function(req, res) {
        res.sendFile(path.join(__dirname+'/doc/api.html'));
    });

    app.use("/", router);
    app.use('/auth', app.routes.auth);
    app.use('/tools', app.routes.tools);

    app.listen(app.get('port'), function() {
        //connect com o banco de dados
        app.data.connection.sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    });
})();