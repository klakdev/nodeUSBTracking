

import React from "react";
import {Box} from "@material-ui/core";

export default function Device({props}) {
    console.log('device', props);
    console.log('device', props.productId);
    return (
        <Box className="device">
            <h2>{props.type || 'UNKNOWN'}</h2>
            <p>product ID  : {props.productId}</p>
            <p>vendor ID   : {props.vendorId}</p>
        </Box>
    )
}
