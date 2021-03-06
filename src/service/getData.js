import fetch from '../config/fetch'

import * as resume from './tempdata/resume'
import * as login from './tempdata/elm/login'
import * as home from './tempdata/elm/home'
import * as city from './tempdata/elm/city'
import * as msite from './tempdata/elm/msite'
import * as search from './tempdata/elm/search'
import * as food from './tempdata/elm/food'
import * as shop from './tempdata/elm/shop'
import * as confirm from './tempdata/elm/confirm'
import * as order from './tempdata/elm/order'
import * as service from './tempdata/elm/service'
import * as addDetail from './tempdata/elm/addDetail'
import * as addresspart from './tempdata/elm/address'
import * as vip from './tempdata/elm/vip'
import * as hongbao from './tempdata/elm/hongbao'
import * as meizi from './tempdata/elm/meizi'

const setpromise = data => {
    return new Promise((resolve, reject) => {
        resolve(data)
    })
}
var getResumeStyle = () => setpromise(resume.style);
var getResumeContent = () => setpromise(resume.content);

var cityGuess = () => setpromise(home.guesscity);
var hotcity = () => setpromise(home.hotcity);
var groupcity = () => setpromise(home.groupcity);
var currentcity = number => setpromise(city.currentcity);
var searchplace = (cityid, value) => setpromise(city.searchdata);
var msiteAdress = geohash => setpromise(msite.msiteAdress);
var msiteFoodTypes = geohash => setpromise(msite.foodTypes);
var shopList = (latitude, longitude, offset) => setpromise(msite.shopList);
var searchRestaurant = (geohash, keyword) => setpromise(search.searchData);
var foodCategory = (latitude, longitude) => setpromise(food.category);
var foodDelivery = (latitude, longitude) => setpromise(food.delivery);
var foodActivity = (latitude, longitude) => setpromise(food.activity);
var shopDetails = (shopid, latitude, longitude) => setpromise(shop.shopDetails);
var foodMenu = restaurant_id => setpromise(shop.shopMenu);
var getRatingList = (offset, tag_name = '') => setpromise(shop.ratingList);
var ratingScores = shopid => setpromise(shop.scores);
var ratingTags = shopid => setpromise(shop.tage);
var mobileCode = phone => setpromise(login.validate_token);
var accountLogin = (username, password, captcha_code) => setpromise(login.userInfo);
var checkExist = (checkNumber, type) => setpromise(login.checkExsis);
var sendMobile = (sendData, captcha_code, type, password) => setpromise(login.send);
var checkout = (geohash, entities) => setpromise(confirm.checkout);
var getRemark = (id, sig) => setpromise(confirm.remark);
var getAddress = (id, sig) => setpromise(confirm.addressList);
var getcaptchas = () => setpromise(login.cpatchs);
var searchNearby = keyword => setpromise(confirm.searchAddress);
var postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => setpromise(confirm.addAddress);
var placeOrders = (user_id, cart_id, address_id, description, entities, geohash, sig) => setpromise(confirm.palceOrder);
var rePostVerify = (cart_id, sig, type) => setpromise(confirm.verfiyCode);
var validateOrders = ({
		user_id,
    cart_id,
    address_id,
    description,
    entities,
    geohash,
    sig,
    validation_code,
    validation_token
	    }) => setpromise(confirm.orderSuccess);
var payRequest = (merchantOrderNo, userId) => setpromise(confirm.payDetail);
var getService = () => setpromise(service.serviceData);
var vipCart = (id, number, password) => setpromise(vip.vipcart);
var getHongbaoNum = id => setpromise(hongbao.dataList);
var getExpired = id => setpromise(hongbao.expired);
var exChangeHongbao = (id, exchange_code, captcha_code) => setpromise(hongbao.exchange);
var getUser = () => setpromise(login.userInfo);
var getOrderList = (user_id, offset) => setpromise(order.orderList);
var getOrderDetail = (user_id, orderid) => setpromise(order.orderDetail);
var getAddressList = (user_id) => setpromise(addresspart.address);
var getSearchAddress = (keyword) => setpromise(addDetail.addData);
var deleteAddress = (userid, addressid) => setpromise(vip.vipcart);
var sendLogin = (code, mobile, validate_token) => setpromise(login.userInfo);
export {
    getResumeStyle,
    getResumeContent,

    cityGuess, hotcity, groupcity, currentcity, searchplace, msiteAdress, msiteFoodTypes, shopList, searchRestaurant, foodCategory, foodDelivery, foodActivity, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags, mobileCode, accountLogin, checkExist, sendMobile, checkout, getRemark, getAddress, getcaptchas, searchNearby, postAddAddress, placeOrders, rePostVerify, validateOrders, payRequest, getService, vipCart, getHongbaoNum, getExpired, exChangeHongbao, getUser, sendLogin, getOrderList, getOrderDetail, getAddressList, getSearchAddress, deleteAddress
}
