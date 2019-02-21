module.exports = function(app) {
    let db = app.data.db;
    let sequelize = app.data.connection.sequelize;

    function prepareFilter(tag) {        
        if (tag) {
            return sequelize.query('SELECT TOOLID FROM TAG WHERE NAME = $name',
                                    { bind: { name: tag }, type: sequelize.QueryTypes.SELECT })
                            .then(ids => {
                                let itens = [];

                                for (let x = 0; x < ids.length; x++) {
                                    itens.push(ids[x].TOOLID);
                                }
                                
                                return {'id': {$in: itens}};
                            });
            
        } else {
            return {};
        }
    }

    function prepareTool(tool) {
        let tags = null;

        if (tool.tags) {
            tags = [];
            
            for (let x = 0; x < tool.tags.length; x++) {
                tags.push(tool.tags[x].name);
            }
        }
        
        return {
            title: tool.title,
            link: tool.link,
            description: tool.description,
            tags: tags,
            id: tool.id
        }
    }

    function prepareTools(tools) {
        let newTools = [];
        for (x = 0; x < tools.length; x++) {
            newTools.push(prepareTool(tools[x]));
        }

        return newTools;
    }

    return {
        list: async function(tag) {
            return db.Tool
                        .findAll({
                            include: [{
                                model: db.Tag,
                                as: 'tags'
                            }],
                            where: await prepareFilter(tag)
                        })
                        .then(tools => {
                            if (tools) {
                                return prepareTools(tools);
                            }
                            
                            return [];
                        });
        },
        create: function(tool) {
            let tags = tool.tags;

            tool.tags = [];
            for (let x = 0; x < tags.length; x++) {
                tool.tags.push({name: tags[x]});
            }           
            
            return db.Tool.create(tool, {
                                include: [{association: db.Tool.tags}]
                            })
                            .then(tool => {
                                return prepareTool(tool);
                            });
        },
        delete: function(id) {
            return db.Tool.destroy({where: {id: id}});
        }
    }
}