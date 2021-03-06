import {
    getUser,
    getAddressList
} from '../service/getData'
import {
    GET_USERINFO,
    SAVE_ADDRESS
} from './mutations.js'

export default {
    async getUserInfo(commit, state) {
        let res = await getUser();
        commit(GET_USERINFO, res)
    },
    async saveAddress(commit, state) {
        if (state.removeAddress.length > 0) return;
        let address = await getAddressList(state.userInfo.user_id);

        commit(SAVE_ADDRESS, adress);
    }
}