const hooks = require('hooks');

let stash = {};

hooks.beforeEach((transactions, done) => {  
    if (stash.token) {
        transactions.request.headers['Authorization'] = 'Bearer ' + stash.token;
    }

    done();
});

hooks.before('Authentication > Authentication > Authenticate', (transaction, done) => {
    transaction.skip = true;
    done();
});

hooks.after('Authentication > Authentication > Authenticate', (transaction, done) => {
    stash.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEwMzc5NzYzNTI2MDg0NjA5MDA4MCJ9.L6L3WbMA2Y_8l_5hyS0HM37eLrvApfWabh5wpyQmZCU';
    done();
});

hooks.after('Tools > Gerenciamento de ferramentas > Cadastrar uma ferramenta', (transaction, done) => {
    stash.id = JSON.parse(transaction.real.body).id;
    done();
});

hooks.before('Tools > Gerenciamento de uma ferramenta > Remover uma ferramenta', (transaction, done) => {
    transaction.fullPath = transaction.fullPath.replace('1', stash.id);
    done();
});