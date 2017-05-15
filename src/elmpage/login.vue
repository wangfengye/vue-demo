<template>
    <div class="container">
        <head-top :headTitle="loginWay?'登录':'密码登录'" goBack="true">
            <div slot="extra" @click="changeLoginWay" class="change_login">
                <span>{{loginWay?'密码登录':'短信登录'}}</span>
            </div>
        </head-top>
    
        <form class="login_form" v-if="loginWay">
            <section class="input_container phone_number">
                <input type="text" placeholder="手机号码" maxlength="11" v-model="phoneNumber" />
                <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
                <button v-show="computedTime">已发送({{computedTime}}s)</button>
            </section>
            <section class="input_container">
                <input type="text" placeholder="验证码" maxlength="6" v-model="mobileCode" />
            </section>
        </form>
        <form class="login_form" v-else>
            <section class="input_container">
                <input type="text" placeholder="手机号码/邮箱/用户名" v-model.lazy="userAccount" />
            </section>
            <section class="input_container">
                <input v-if="showPassword" type="text" placeholder="密码" v-model="password" />
                <input v-else type="password" placeholder="密码" v-model="password" />
               <switch-button :statedefault="showPassword" openText="abc" closeText="..." @changeState="changePasswordType"/>
            </section>
            <section class="input_container">
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber" />
                <div class="image_captcha">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="change" @click="getCaptchaCodeImg">换一张</div>
                </div>
    
            </section>
        </form>
    
        <p class="tip">
            温馨提示：未注册饿了么账号的手机号，登录时将自动注册，且代表您已同意
            <a href="https://h5.ele.me/service/agreement/">《用户服务协议》</a>
        </p>
        <div class="submit" @click="mobileLogin">登录</div>
        <router-link to="/forgets" class="to_forget" v-if="!loginWay">忘记密码</router-link>
        <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText" />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import headTop from '../components/headTop.vue'
import alertTip from '../components/alertTip.vue'
import　switchButton from '../components/switchButton'
import { checkExist, mobileCode, sendLogin, accountLogin,getcaptchas } from '../service/getData.js'
export default {
    data() {
        return {
            loginWay: true, //登录方式，默认短信登录
            showPassword: false, // 是否显示密码
            phoneNumber: null, //电话号码
            mobileCode: null, //短信验证码
            validate_token: null, //获取短信时返回的验证值，登录时需要
            computedTime: 0, //倒数记时
            userInfo: null, //获取到的用户信息
            userAccount: null, //用户名
            password: null, //密码
            captchaCodeImg: null, //验证码地址
            codeNumber: null, //验证码
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容

        }
    },
    computed: {
        rightPhoneNumber() {
            return /^1\d{10}$/gi.test(this.phoneNumber);
        }
    },
    components: { headTop, alertTip, switchButton},
    methods: {
        ...mapMutations([
            'RECORD_USERINFO',
        ]),
        //切换登录方式
        changeLoginWay() {
            this.loginWay = !this.loginWay;
        },
        //获取短信验证码
        async getVerifyCode() {
            if (this.rightPhoneNumber) {
                //判断用户是否存在
                let exist = await checkExist(this.phoneNumber, 'mobile');
                console.log(exist);
                if (exist.message) {
                    this.showAlert = true;
                    this.alertText = exist.message;
                    return;
                } else if (!exist.is_exists) {
                    this.showAlert = true;
                    this.alertText = '您输入的手机号尚未绑定';
                    return;
                }
                //倒计时
                this.computedTime = 30;
                this.timer = setInterval(() => {
                    this.computedTime--;
                    if (this.computedTime == 0) {
                        clearInterval(this.timer)
                    }
                }, 1000);
                //发送短信验证码
                let res = await mobileCode(this.phoneNumber);
                if (res.message) {
                    this.showAlert = true;
                    this.alertText = res.message;
                    return;
                }
                this.validate_token = res.validate_token;
            }
        },
        //登录
        async mobileLogin() {
            if (this.loginWay) {
                if (!this.rightPhoneNumber) {
                    this.showAlert = true;
                    this.alertText = '手机号码不正确';
                    return
                } else if (!(/^\d{6}$/gi.test(this.mobileCode))) {
                    this.showAlert = true;
                    this.alertText = '短信验证码不正确';
                    return
                }
                this.userInfo = await sendLogin(this.mobileCode, this.phoneNumber,
                    this.validate_token);
            } else {
                if (!this.userAccount) {
                    this.showAlert = true;
                    this.alertText = '请输入手机号/邮箱/用户名';
                    return;
                }
                if (!this.password) {
                    this.showAlert = true;
                    this.alertText = '请输入密码';
                    return
                }
                if (!this.codeNumber) {
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                }
                this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
            }
            if (!this.userInfo.user_id) {
                this.showAlert = true;
                this.alertText = this.userInfo.message;
            } else {
                //保存用户信息;
                this.RECORD_USERINFO(this.userInfo);
                this.$router.go(-1);
            }
        },
        //改变密码显示方式
        changePasswordType() {
            this.showPassword = !this.showPassword;
        },
        //获取验证码
        async getCaptchaCodeImg(){
            let res = await getcaptchas();
            this.captchaCodeImg = res.code;
        },
        closeTip() {
            this.showAlert = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../style/mixin';
.change_login {
    right: 0.5rem;
    @include sc(.7rem,
    #fff);
    @include ct;
    span {
        color: #fff;
        @include wh(1.2rem,
        1.2rem);
    }
}

.container {
    padding-top: 2rem;
}

.login_form {
    background-color: #fff;
    margin-top: .6rem;
    .input_container {
        /*子元素留白*/
        display: flex;
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #f1f1f1;
        input {
            @include sc(.7rem, #666);
        }
        button {
            @include sc(.65rem, #fff);
            padding: .28rem .4rem;
            border: 1px;
            border-radius: .15rem;
        }
        .right_phone_number {
            background-color: #4cd964;
        }
    }
    .phone_number {
        padding: .3rem .8rem;
    }
}

.tip {
    @include sc(.5rem, #999);
    padding: .4rem .6rem;
    line-height: .7rem;
    a {
        color: $blue;
    }
}

.submit {
    margin: .5rem 1rem;
    @include sc(.7rem, #fff);
    padding: .5rem 0;
    background-color: #4cd964;
    border: 1px;
    border-radius: .15rem;
    text-align: center;
}

.to_forget {
    float: right;
    @include sc(.6rem, #3695e9);
    margin-right: .3rem;
}



.change_to_text {
    background-color: #4cd964;
}

.image_captcha {
    display: flex;
    align-items: center;
    img {
        @include wh(3.5rem, 1.5rem);
        margin-right: .2rem;
    }
    .change {
        display: flex;
        flex-direction: 'column';
        flex-wrap: wrap;
        width: 2rem;
        justify-content: center;
        @include sc(.55rem, #666);
        color: #3b95e9;
        margin-top: .2rem;
    }
}
</style>