
import axios from 'axios';


export default {
    async _get(url) {
        let result = await axios.get(url);
        return result.data;
    },

    async _patch(url){
        let result = await axios.patch(url);
        return result.data;
    }
};
