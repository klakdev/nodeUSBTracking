

const port = process.env.PORT || 4893;
/**
 * @param {Server} server
 * @param {Object} usbTree
 * @param {function():Array.<Tree>} usbTree.getFullTree
 * @param {function():Device} usbTree.getUpdate
 */
const UsbAPI = ({server, usbTree}) => {

    return  {
        getTree(socket){
            usbTree.getFullTree()
                .then(trees => trees.map(tree => tree.toJson()))
                .then(res => socket.json(res));
        },

        async updateTree(socket){
            usbTree.getUpdate()
                .then(data => {
                    //todo - dont destruct here
                    const { event, device } = data;
                    socket.json({ event, device: device.toJson() })
                });
        },

        start() {
           server.listen(port, (err) =>{
               if(err) throw err;
               console.log('listening on port %s', port);
           });
        }

    }
};

module.exports = UsbAPI;
