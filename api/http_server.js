
const express = require('express');
const libusbDevice = require('../usb/libusb_devices.js');
const usbTree = require('../usb/usb_tree.js')(libusbDevice);
const app = express();
const usbAPI = require('./usb_tree_api.js')({server: app, usbTree});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");//TODO - only safe domains
    res.header("Access-Control-Allow-Methods", "*");//TODO - only safe domains
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/tree', (req ,res) => usbAPI.getTree(res));
app.patch('/tree', (req ,res) => usbAPI.updateTree(res));

usbAPI.start();


