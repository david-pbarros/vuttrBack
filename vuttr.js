(function () {
    "use strict";

    const app = require('./expressInit')();
    const router = require('express').Router();
    const path = require('path');
    const toolsRouter = require('./routes/tools.js');

    app.listen(app.get('port'), function() {
        console.log('aplicação iniciada na porta ' + app.get('port'));
    });

    router.get("/", function(req, res) {
        res.sendFile(path.join(__dirname+'/doc/api.html'));
    });

    app.use("/", router);
    app.use("/tools", toolsRouter());
})();