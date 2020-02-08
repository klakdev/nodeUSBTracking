
import React from "react";
import Box from '@material-ui/core/Box'
import Device from './Device'
import {blue, red} from "@material-ui/core/colors";

/**
 *
 * @param {Object} props
 * @param {Tree} props
 * @return {*}
 * @constructor
 */
export default function Tree({props}){
    console.log(props);
    return (
        <Box color={blue}>
            <Device props={props.value}/>
            <Box color={red}>
                <div>
                    <ol>
                        {props.children.map(child =>
                            <li>
                                <Device key={child.productId} props={child}/>
                            </li>
                        )}
                    </ol>
                </div>
            </Box>
        </Box>
    )
}
