<template>
    <header id='head_top'>
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
        </section>
        <router-link :to="userInfo?'/home':'/login'" v-if="signUp" class="head_login">
          <div class="user_avatar" v-if="userInfo"></div>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <div class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </div>
        <slot name ="extra"></slot>
    </header>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default{
    data () {
        return {
            
        }
    },
    props: {
        goBack:{default: false},
        signUp:{default:false},
        headTitle:{default:'Home Page'},
},
    computed:{
        ...mapState(['userInfo']),
    },
    methods: {  
    }
}
</script>

<style lang="scss" scoped>
@import'../style/mixin';
#head_top {
    background-color: $blue;
    position: fixed;
    z-index: 100;
    /*z轴坐标, 决定同层元素的覆盖顺序*/
    left: 0;
    top: 0;
    @include wh(100%, 2rem);
}

.head_goback {
    left: 0.4rem;
    top: 0.4rem;
    @include wh(1.2rem, 1.2rem);
    line-height: 2.2rem;
    margin: .4rem;
    background-image: url('../images/back.png');
    background-size: cover;
}

.head_login {
    right: 0.5rem;
    @include sc(.7rem,
    #fff);
    @include ct;
    .login_span {
        color: #fff;
        @include wh(1.2rem,
        1.2rem);
    }
    .user_avatar{
        background-image: url('../images/ic_user.png');
            background-size: cover;
        @include wh(1.2rem, 1.2rem);
    }
}
.title_head{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text{
        @include sc(0.8rem,#fff);
        text-align: center;
        font-weight: bold;
    }
}
</style>

