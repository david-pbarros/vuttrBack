const hooks = require('hooks');

let stash = {};

hooks.beforeEach((transactions, done) => {
    if (stash.token) {
        transactions.request.headers['Authorization'] = 'Bearer ' + stash.token;
    }

    done();
});

hooks.after('Authentication > Authentication > Authenticate', (transaction, done) => {
    stash.token = JSON.parse(transaction.real.body).token;
    done();
});