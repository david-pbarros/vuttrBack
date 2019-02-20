module.exports = function(app) {
    let dataTypes = app.data.connection.Sequelize;
    let sequelize = app.data.connection.sequelize;

    let models =  {
        Tool: require('../models/tool')(sequelize, dataTypes),
        Tag: require('../models/tag')(sequelize, dataTypes)
    }

    models.Tool.associate(models);

    return models;
}