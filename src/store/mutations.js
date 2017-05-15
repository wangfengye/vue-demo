export default {
    ['GET_USERINFO'](state, info) {
        if (state.userInfo && (state.userInfo.usernam !== info.username)) {
            return;
        };
        if (info) {
            state.userInfo = { ...info };
            let validity = 30;
            let now = new Date();
            now.setTime(now.getTime + validity * 1000 * 60 * 60 * 24);/*缓存时间*/
            document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
            document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString();
        }
    }
}