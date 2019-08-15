const config = require('config');
const app = require('./lib/app');

app.default.listen(process.env.PORT || config.port);
