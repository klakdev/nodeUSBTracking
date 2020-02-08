
const deviceAPI = require('./api/device-api.js');
const { diagnose } = require('./usb/index.js');
const { server } = require('./api/http_server.js');

deviceAPI({diagnose, server});
