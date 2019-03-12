const express = require('express');
const startupDebugger = require('debug')('app:startup');

const app = express();

require('./startup/db')();
require('./startup/routes_handler')(app);

const port = process.env.port || 5000;
app.listen(port, () => {
    startupDebugger(`Listening to port ${port}...`);
});
