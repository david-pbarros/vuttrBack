'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tool',[{
      title: 'Tool 1',
      link: 'http://vuttr/tool1',
      description: 'Tool 1 description'
    },{
      title: 'Tool 2',
      link: 'http://vuttr/tool2',
      description: 'Tool 2 description'
    },{
      title: 'Tool 3',
      link: 'http://vuttr/tool3',
      description: 'Tool 3 description'
    },{
      title: 'Tool 4',
      link: 'http://vuttr/tool4',
      description: 'Tool 4 description'
    },{
      title: 'Tool 5',
      link: 'http://vuttr/tool5',
      description: 'Tool 5 description'
    }])
    .then(async() => {
      const tools = await queryInterface.sequelize.query('SELECT id FROM Tool');

      for (let x = 0; x < tools[0].length; x++) {
        let tool = tools[0][x].id;

        if (x % 2 === 0) {
          await queryInterface.bulkInsert('Tag',[{
            name: 'Tag 1',
            toolId: tool
          },{
            name: 'Tag 2',
            toolId: tool
          },{
            name: 'Tag 3',
            toolId: tool
          },{
            name: 'Tag 4',
            toolId: tool
          }]);
        } else {
          await queryInterface.bulkInsert('Tag',[{
            name: 'Tag 3',
            toolId: tool
          },{
            name: 'Tag 4',
            toolId: tool
          },{
            name: 'Tag 5',
            toolId: tool
          },{
            name: 'Tag 6',
            toolId: tool
          }]);
        }
      }
    });    
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Tool', null)
    .then(() => {
      queryInterface.bulkDelete('Tag', null, {});
    });
  }
};
