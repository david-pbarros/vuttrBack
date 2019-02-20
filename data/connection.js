"use strict";

module.exports = function(app) {
    let Sequelize = require('sequelize')

    return {
        Sequelize: Sequelize,
        sequelize: new Sequelize('vuttr', 'root', null, {
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
            define: {
                timestamps: false, // true by default
                freezeTableName: true // false by default
            },      
    
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        })
    };
};