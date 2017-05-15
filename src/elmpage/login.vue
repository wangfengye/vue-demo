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
                <div class="button_switch" :class="{change_to_text:showPassword}">
                    <div class="circle_button" :class="{trans_to_right:showPassword}" @click="changePasswordType"></div>
                    <span>abc</span>
                    <span>...</span>
                </div>
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
    import headTop from '../components/headTop.vue'
    import alertTip from '../components/alertTip.vue'
    export default {
        data () {
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
                captchaCodeImg:null, //验证码地址
                codeNumber: null, //验证码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                
            }
        },
        computed: {
          rightPhoneNumber(){
              return /^1\d{10}$/gi.test(this.phoneNumber);
          }  
        },
        components:{headTop,alertTip},
        methods: {
            //切换登录方式
            changeLoginWay(){
                this.loginWay =!this.loginWay;
            },
            //获取短信验证码
            async getVerifyCode(){
                if(this.rightPhoneNumber){
                    this.computedTime =30;
                    //setInterval(function,time)周期性调用函数
                    this.timer = setInterval(()=>{
                        this.computedTime--;
                        if(this.computedTime == 0){
                            clearInterval(this.timer)
                        }
                    },1000)
                    //判断用户是否存在
                    let exist =await checkExist(this.phoneNumber,'mobile');
                    if (exsit.message){
                        this.showAlert =true;
                        this.alertText =exsit.message;
                    }
                }                
            },
            //登录
            mobileLogin(){},
            //改变密码显示方式
            changePasswordType(){
                this.showPassword=!this.showPassword;
            },
            closeTip(){
                this.showAlert=false;
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

.button_switch {
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include wh(2rem, .7rem);
    padding: 0 .2rem;
    border: 1px;
    border-radius: .5rem;
    position: relative;
    transition: all .3s;
    .circle_button {
        transition: all.3s;
        position: absolute;
        z-index: 1;
        @include wh(1.2rem, 1.2rem);
        left: -.1rem;
        box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0, 0, 0, .1);
        /*阴影*/
        background-color: #f1f1f1;
        border-radius: 50%;
    }
    .trans_to_right {
        transform: translateX(1.3rem);
    }
    span {
        @include sc(.45rem, #fff);
        transform: translateY(.05rem);
        line-height: .6rem;
    }
    span:nth-of-type(2) {
        transform: translateY(-.08rem);
    }
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