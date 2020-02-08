
import React, { Component } from "react";
import api from '../api/index';
import Tree from './Tree';
import Event from '../model/event.js'

function findParent(trees, device) {
    const { parent } = device;
    for (let i = 0; i < trees.length; i++) {
        const {value} = trees[i];
        if (value.vendorId === parent.vendorId ||
            value.productId === parent.productId) {
            return i;
        }
    }
    return null;
}

function findDevice(children, device) {

    const { vendorId : _v, productId: _p } = device;
    for (let j = 0; j < children.length; j++) {
        let { vendorId, productId } = children[j];
        if(vendorId === _v && productId === _p) {
            return j;
        }
    }
    return null;
}

export default class Trees extends Component{
    state = {
        trees : []
    };

    componentDidMount() {
         api.getTree().then(trees => {
             console.log(trees);
             this.setState({ trees });
             return this.updateTree();
         })
    }

    addDevice(device) {
        let treeIndex = findParent(this.state.trees, device);
        let trees = [...this.state.trees];
        trees[treeIndex].children.push(device);
        this.setState({trees})
    }

    removeDevice(device) {
        let treeIndex = findParent(this.state.trees, device);
        const { children } = this.state.trees[treeIndex];
        const childIndex = findDevice(children, device);
        let trees = [...this.state.trees];
        trees[treeIndex].children.splice(childIndex, 1);
        this.setState({trees})
    }

    updateTree() {
        console.log('polling');
        api.getUpdate().then(event => {
            let { device } = event;
            switch (event.event) {
                case Event.TYPE.ATTACH:
                    this.addDevice(device);
                    break;
                case Event.TYPE.DETACH:
                    this.removeDevice(device);
                    break;
                default:
                    return;
            }
            this.updateTree();
        }).catch(err => {
            console.error(err);
            return this.updateTree();
        })
    }

    render() {
        return (
            <div className="trees">
                {
                    this.state.trees.map(tree =>
                        <Tree key={tree.value.productId} props={tree}/>
                    )
                }
            </div>
        )
    }
}
