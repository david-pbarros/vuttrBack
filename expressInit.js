const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
const helmet = require('helmet');

module.exports = function() {
    var app = express();

    //variavel de ambiente
    app.set('port', process.env.PORT || 3000);

    //middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    //app.use(require('method-override')());
    app.use(helmet());

    //proteção
    app.use(helmet.frameguard());//impede a pagina de ser aberta dentro de um frame/iframe
    app.use(helmet.xssFilter());//disabilita o cross-site
    app.use(helmet.noSniff());//browser não pode inferir mime types
    app.disable('x-powered-by');//remove do header
    
    //conteudo statico
    app.use('/node_modules', express.static('./node_modules'));

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
   
    app.bodyParser = bodyParser;
    
    load('data')
        .then('resolvers')
        .then('routes')
        .into(app);

    return app;
}