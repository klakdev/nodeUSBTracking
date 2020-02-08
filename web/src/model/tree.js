
import Device from "./device";

class Tree {

    constructor(value) {
        this.value = value;
        this.children = []
    }

    addChild(obj) {
        this.children.push(obj);
    }

    toJson() {
        let {value, children} = this;
        return {
            value: value.toJson(),
            children: children.map(child => child.toJson())
        }
    }

    static fromJson(json) {
        let {value, children} = json;
        let parent = Device.fromJson(value);
        const tree = new Tree(parent);
        children.forEach(child =>
            tree.addChild(Device.fromJson(child)))
        return tree;
    }

}

export default Tree;
