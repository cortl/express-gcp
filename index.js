const config = require('config');
const app = require('./lib/app');

app.default.listen(config.port, () => console.log(`Listening on port ${config.port}`));
