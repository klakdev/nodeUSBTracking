
class Device {

    get productId() {
        return this._productId;
    }

    get vendorId() {
        return this._vendorId;
    }

    get type() {
        return this._type;
    }

    get description() {
        return this._description;
    }

    get parent() {
        return this._parent;
    }

    constructor({productId, vendorId, type, description, parent = null}) {
        //sanitize
        this._productId = productId;
        this._vendorId = vendorId;
        this._type = type;
        this._description = description;
        this._parent = parent;
    }

    toJson() {
        let {productId, vendorId, type, description } = this;
        return {productId, vendorId, type, description };
    }

    static fromJson(json) {
        const { productId, vendorId, type, description, parent: p } = json;
        return new Device({productId, vendorId, type, description,
            parent: p? new Device(p) : null })
    }
}

export default Device;
