<template>

</template>

<script>
import {mapState,mapMutations}from 'vuex'
import { msiteAdress, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags } from 'src/service/getData'
import headTop from 'src/components/headTop'
import loading from 'src/compontents/loading'
import buyCart from 'src/components/buyCart'
import ratingStar from 'src/components/ratingStar'
import { loadMore, getImgPath } from 'src/components/common/mixin'
import BScroll from 'better-scroll'
export default {
    data() {
        return {

        }
    },
}
</script>

<style lang='scss' scoped>

</style>
