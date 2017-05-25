<template>
    
</template>

<script>
import { mapSta, mapMutations } from 'vuex'
export default {
    data() {
        return {
            showMoveDot: [],//控制下落的小圆点显示隐藏
        }
    },
    computed: {
        ...mapState(['cartList']),
        /**
             * 监听cartList变化，更新当前商铺的购物车信息shopCart，同时返回一个新的对象
             */
            shopCart: function() {
                return Object.assign({},this.cartList[this.shopId]);
            }

    },

}
</script>

<style lang='scss' scoped>

</style>
