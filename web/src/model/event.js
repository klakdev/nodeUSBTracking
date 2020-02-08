
import Device from "./device";

class DeviceEvent {

    /**
     *
     * @param {string} event
     * @param {Device} device
     */
    constructor(event, device) {
        this.event = event;
        this.device = device;
    }

    /**
     * @param {Object} json
     * @return DeviceEvent
     */
    static fromJson(json) {
        let {event, device: d} = json;
        const device = Device.fromJson(d);
        return new DeviceEvent(event, device);
    }

    /**
     *
     * @enum {string}
     * @constructor
     */
    static get TYPE () {
        return {
            ATTACH: 'attach',
            DETACH: 'detach'
        }
    }
}

export default DeviceEvent;
