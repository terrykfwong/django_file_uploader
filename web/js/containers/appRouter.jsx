if (process.env.NODE_ENV === 'production') {
    module.exports = require('./appRouter.prod');
} else {
    module.exports = require('./appRouter.dev');
}
