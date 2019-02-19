(function () {
    "use strict";

    const app = require('./expressInit')();
    const router = require('express').Router();
    const path = require('path');
    const auth = require('./auth')();
    const authRouter = require('./routes/auth');
    const toolsRouter = require('./routes/tools');

    app.listen(app.get('port'), function() {
        console.log('aplicação iniciada na porta ' + app.get('port'));
    });

    app.use(auth.initialize()); // Used to initialize passport

    router.get("/", function(req, res) {
        res.sendFile(path.join(__dirname+'/doc/api.html'));
    });

    app.use("/", router);
    app.use('/auth', authRouter(auth));
    app.use("/tools", toolsRouter(auth));
})();