/**
 * author: maple
 * figure 用于文档中插图的图像,figaption用于为图像添加标题
 */
<template>
    <div class="msite_container">
        <head-top signUp="true" :headTitle="msiteTitle"></head-top>
        <nav class="msite_nav">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide food_types_container" v-for="(item,index) in foodTypes" :key="index">
                        <router-link :to="{path:'/food',query:{geohash,title:foodItem.title,rastaurant_category_id:getCateGoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food" v-if="foodItem.title !== '预订早餐'">
                            <figure>
                                <img :src='imgBaseUrl+foodItem.image_url' />
                                <figcaption>{{foodItem.title}}</figcaption>
                            </figure>
                        </router-link>
                        <a href="https://zaocan.ele.me/" class="link_to_food" v-else>
                            <figure>
                                <img :src="imgBaseUrl + foodItem.image_url">
                                <figcaption>{{foodItem.title}}</figcaption>
                            </figure>
                        </a>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </nav>
    
        <div class="shop_list_container">
            <header class="shop_header">
                <svg class="shop_icon">
                    <use xlink:href="#shop"></use>
                </svg>
                <span class="shop_header_title">附近商家</span>
            </header>
            <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
        </div>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { imgBaseUrl } from 'src/config/env'
import headTop from 'src/components/headTop'
import shopList from 'src/components/shopList'
import footGuide from 'src/components/footGuide'
import { msiteAdress, msiteFoodTypes, msiteShopList } from 'src/service/getData'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'
export default {
    data() {
        return {
            geohash: '', // city页面传递过来的地址geohash
            msiteTitle: '请选择地址...', // msiet页面头部标题
            foodTypes: [], // 食品分类列表
            hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
            imgBaseUrl, //图片域名地址
        }
    },
    async beforeMount() {
        this.geohash = this.$route.query.geohash;
        //保存geohash到vuex
        this.SAVE_GEOHASH(this.geohash);
        //获取位置信息
        let res = await msiteAdress(this.geohash);
        this.msiteTitle = res.name;
        //记录当前经纬度
        this.RECORD_ADDRESS(res);
        this.hasGetData = true;
    },
    mounted() {
        //获取导航食品类型列表
        msiteFoodTypes(this.geohash).then(res => {
            let resLength = res.length;
            let resArr = res.concat([]);//返回一个新的数组
            let foodArr = [];
            for (var i = 0, j = 0; i < resLength; i += 8, j++) {
                foodArr[j] = resArr.splice(0, 8)//删除下标0-8的元素,并返回删除的元素
            }
            this.foodTypes = foodArr;
        }).then(() => {
            //初始化swiper
            new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                loop: true
            })
        })
    },
    components: {
        headTop,shopList,footGuide
    },
    computed: {

    },
    methods: {
        ...mapMutations([
            'RECORD_ADDRESS', 'SAVE_GEOHASH'
        ]),
        //解码url地址,求去restaurant_category_id值
        getCateGoryId(url) {
            let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
            if (/restaurant_category_id/gi.test(urlData)) {
                return JSON.parse(urlData).restaurant_category_id.id
            } else {
                return ''
            }
        }
    },
    watch: {

    }

}
</script>

<style lang='scss' scoped>
@import 'src/style/mixin';
.msite_container {
    padding-top: 2rem;
}

.msite_nav {
    background-color: #fff;
    border-bottom: .025rem solid $bc;
    .swiper-container {
        @include wh(100%, auto);
        padding-bottom: .6rem;
        .swiper-pagination {
            bottom: .2rem;
        }
    }
}

.food_types_container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: .3rem;
    .link_to_food {
        width: 25%;
        padding: .3rem, 0rem;
        @include fj(center);
        figure {
            img {
                margin-bottom: .3rem;
                @include wh(1.8rem, 1.8rem);
            }
            figcaption {
                text-align: center;
                @include sc(0.55rem, #666);
            }
        }
    }
}

.shop_list_container {
    margin-top: .4rem;
    border-top: .025rem solid $bc;
    background-color: #fff;
    .shop_header {
        .shop_icon {
            fill: #999;
            margin-left: .6rem;
            vertical-align: middle;
            @include wh(.6rem, .6rem)
        }
        .shop_header_title {
            color: #999;
            @include font(.55rem, 1.6rem);
        }
    }
}
</style>