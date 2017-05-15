/*
* 左右滑动按钮
* defaultState 默认状态
* bug 调用组件时,父组件无法获取该组件的状态
*/

<template>
    <div class="button_switch" :class="{change_to_text:isOpen}">
        <div class="circle_button" :class="{trans_to_right:isOpen}" @click="changeState"></div>
        <span>{{openText}}</span>
        <span>{{closeText}}</span>
    </div>
</template>
<script>
export default{
    data () {
        return {
           isOpen:true,
        }
    },
    created () {
        this.isOpen = this.defaultState;
    },
    props: ['defaultState','openText','closeText'],
    methods: {
        changeState(){
            this.isOpen =!this.isOpen;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../style/mixin';
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
</style>