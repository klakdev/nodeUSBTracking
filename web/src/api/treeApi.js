
import Tree from '../model/tree';
import DeviceEvent from '../model/event';


/**
 *
 * @param {Object} request
 * @param  { function(url:string):Promise<ReadableStream> } request._get - initiate a get request
 * @param  { function(url:string):Promise<ReadableStream> } request._patch - initiate a patch request
 * @param {Object} apiConfig
 * @param {string} apiConfig.TREES
 * @param {string} apiConfig.UPDATE
 */
export default (request, apiConfig) => {
    return {
        /**
         *
         * @return Promise<Array.<Tree>>
         */
        async getTree() {
            const result = await request._get(apiConfig.TREES);
            return result.map( tree=>  Tree.fromJson(tree));
        },

        /**
         *
         * @return {Promise<{DeviceEvent}>}
         */
        async getUpdate() {
            const result = await request._patch(apiConfig.UPDATE);
            return DeviceEvent.fromJson(result);
        }
    }
};
