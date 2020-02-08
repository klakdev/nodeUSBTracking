
const { promisify } = require('util');

const usb = require('usb');

const Device = require('../model/device.js');
const DeviceEvent = require('../model/event.js');

function reverse(obj) {
    const revObj = {};
    Object.entries(obj)
        .forEach(([k, v]) => revObj[v] = k );
    return revObj;
}

const ZERO_DESCRIPTOR = 0;

const LIBUSB_CLASS_CODE = {
    LIBUSB_CLASS_PER_INTERFACE : 0,
    LIBUSB_CLASS_AUDIO : 1,
    LIBUSB_CLASS_COMM : 2,
    LIBUSB_CLASS_HID : 3,
    LIBUSB_CLASS_PHYSICAL : 5,
    LIBUSB_CLASS_PRINTER : 7,
    LIBUSB_CLASS_PTP : 6,
    LIBUSB_CLASS_IMAGE : 6,
    LIBUSB_CLASS_MASS_STORAGE : 8,
    LIBUSB_CLASS_HUB : 9,
    LIBUSB_CLASS_DATA : 10,
    LIBUSB_CLASS_SMART_CARD : 0x0b,
    LIBUSB_CLASS_CONTENT_SECURITY : 0x0d,
    LIBUSB_CLASS_VIDEO : 0x0e,
    LIBUSB_CLASS_PERSONAL_HEALTHCARE : 0x0f,
    LIBUSB_CLASS_DIAGNOSTIC_DEVICE : 0xdc,
    LIBUSB_CLASS_WIRELESS : 0xe0,
    LIBUSB_CLASS_APPLICATION : 0xfe,
    LIBUSB_CLASS_VENDOR_SPEC : 0xff
};

const LIBUSB_CODE_TO_CLASS = reverse(LIBUSB_CLASS_CODE);

const LIBUSB_DESCRIPTOR_TYPE = {
    LIBUSB_DT_DEVICE : 0x01,
    LIBUSB_DT_CONFIG : 0x02,
    LIBUSB_DT_STRING : 0x03,
    LIBUSB_DT_INTERFACE : 0x04,
    LIBUSB_DT_ENDPOINT : 0x05,
    LIBUSB_DT_BOS : 0x0f,
    LIBUSB_DT_DEVICE_CAPABILITY : 0x10,
    LIBUSB_DT_HID : 0x21,
    LIBUSB_DT_REPORT : 0x22,
    LIBUSB_DT_PHYSICAL : 0x23,
    LIBUSB_DT_HUB : 0x29,
    LIBUSB_DT_SUPERSPEED_HUB : 0x2a,
    LIBUSB_DT_SS_ENDPOINT_COMPANION : 0x30
};
const LIBUSB_CODE_TO_DESCRIPTOR_TYPE = reverse(LIBUSB_DESCRIPTOR_TYPE);

function normalize(rawDevice){
    let {
        parent,
        description,
        deviceDescriptor : {
            idVendor: vendorId,
            idProduct: productId,
            bDeviceClass }
    } = rawDevice;

    return new Device({
        productId,
        vendorId,
        description,
        type: LIBUSB_CODE_TO_CLASS[bDeviceClass],
        parent:  parent? normalize(parent) : null
    })
}

function getUpdates(onUpdate) {
    //TODO - use separate emitter for each request
    Object.values(DeviceEvent.TYPE).forEach(event => {
        usb.once(event, rawDevice => {
            onUpdate(event, normalize(rawDevice));
        });
    });
}


const libUSBDevice = {

    async getDeviceList() {
        let rawDeviceList = usb.getDeviceList();
        for (let i = 0; i < rawDeviceList.length; i++) {
            const device = rawDeviceList[i];
            try {
                device.open();
                device.getStringDescriptorAsync = promisify(device.getStringDescriptor);
                device.description = await device.getStringDescriptorAsync(/*Not sure about this*/ ZERO_DESCRIPTOR);
            }
            catch (e) {
                console.error(e);
            }
        }
        return rawDeviceList.map(rawDevice => normalize(rawDevice));
    },

    async getUpdates() {
        return new Promise(res => {
            getUpdates((event, device) => {
                let deviceEvent = new DeviceEvent(event, device);
                res(deviceEvent);
            })
        });

    }
};

module.exports = libUSBDevice;
