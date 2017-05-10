<template>
    <header id='head_top'>
        <slot name ='logo'></slot>
        <slot name ='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
             
        </section>
    </header>
</template>
<script>
export default{
    data () {
        return {
            goBack:true,
        }
    },
    methods: {    
    }
}
</script>
<style lang="scss" scoped>
@import'../style/mixin';
#head_top{
    background-color:$blue;
    position: fixed;
    z-index: 100; /*z轴坐标, 决定同层元素的覆盖顺序*/
    left: 0;
    top: 0;
    @include wh(100%,2rem);
}
.head_goback{
    left:0.4rem;
    top: 0.4rem;
    @include wh(1.5rem,1.5rem);
    line-height: 2.2rem;
    margin:.2rem;
    background-image: url('../images/back.png');
    background-size:cover; 

}

</style>

