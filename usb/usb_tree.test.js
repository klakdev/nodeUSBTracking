
const libusbDevice = require('./libusb_devices.js');
const usbTree = require('./usb_tree.js')(libusbDevice);
const Tree = require('../model/tree.js');
const Device = require('../model/device.js');

test('libusb - build full tree',  async () => {
    let trees = await usbTree.getFullTree();
    //test results
    expect(Array.isArray(trees)).toBe(true);
    expect(trees.length).toBe(2);
    const tree0 = trees[0];
    expect(tree0 instanceof Tree).toBe(true);
    expect(Array.isArray(tree0.children)).toBe(true);
    tree0.children.forEach(val => expect(val instanceof Device).toBe(true));
    expect(trees[1] instanceof Tree).toBe(true);
});
