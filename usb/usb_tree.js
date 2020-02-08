
const Tree = require('../model/tree.js');

/**
 *
 * @param {Array.<Tree>} list
 * @param {Device} device
 */
function findIndex(list, device) {
    for (let i = 0; i < list.length; i++) {
        let d = list[i].value;
        if(d.vendorId === device.vendorId &&
            d.productId === device.productId) {
            return i;
        }
    }
    return null;
}

/**
 *
 * @param {Array.<Device>} deviceList
 */
function buildTree(deviceList) {
    /**
     *
     * @type {Array.<Tree>}
     */
    let trees = [];
    for(let i = 0; i < deviceList.length; i++) {
        let device = deviceList[i];
        if (device.parent) {
            let i = findIndex(trees, device.parent);
            if (i === null) {
                i = trees.push(new Tree(device.parent)) - 1;
            }
            trees[i].addChild(device);
        } else {
            let i = findIndex(trees, device);
            if (i === null) {
                trees.push(new Tree(device));
            }
        }
    }
    return trees;
}

module.exports = ({getDeviceList, getUpdates}) => {
    return {

        /**
         *
         * @return {Promise<Array<Tree>>}
         */
        async getFullTree() {
            const deviceList = await getDeviceList();
            //add some async behavior here
            return buildTree(deviceList)
        },

        /**
         *
         * @return {DeviceEvent}
         */
        async getUpdate() {
            return await getUpdates();
        }
    }
};
