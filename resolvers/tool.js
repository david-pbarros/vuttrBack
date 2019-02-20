module.exports = function(app) {
    let db = app.data.db;

    return {
        list: async function(tag) {
            return await db.Tool
                            .findAll({
                                include: [{
                                    model: db.Tag
                                }]
                            })
                            .then(tools => {
                                if (tools) {
                                    //return tools;
                                }
                                
                                return [];
                            });
        },
        create: function(tool) {

        },
        delete: function(id) {

        }
    }
}