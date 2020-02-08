
import axiosApi from './axiosImplemenatation';
import treeAPi from  './treeApi';

const BASE_URL = 'http://localhost:4893';
const APIS = {
    TREES: `${BASE_URL}/tree`,
    UPDATE: `${BASE_URL}/tree`
}

export default treeAPi(axiosApi, APIS);
