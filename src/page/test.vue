<template>
    <div>
        <!--         <button v-on:click="getLength">
                        length</button>
                    <div class="code" v-html="codeInStyleTag"></div>
                    <br/>
                    <switch-button :open="s" openText="S" closeText="N" @changeState="changeState" />
                    <alert-tip v-show="false" alertText="hahaha" />
                    <rating-star :rating="stars" class="rating_star"/>
                        <loading v-show="s"></loading>-->
    
      <buy-cart class="a" shopId='1862826' :foods='foods' >

      </buy-cart>
       <foot-guide/>
    </div>
</template>
<script>
import footGuide from '../components/footGuide'
import ratingStar from '../components/ratingStar.vue'
import loading from '../components/loading.vue'
import switchButton from '../components/switchButton.vue'
import alertTip from '../components/alertTip.vue'
import { loadMore } from '../components/mixin.js'
import { mapMutations } from 'vuex'
import shopList from 'src/components/shopList'
import buyCart from 'src/components/buyCart'
export default {
    data() {
        return {
            list: [0, 1],
            code: '*{',
            s: false,
            stars: 0,
            listEnd: 3,
            foods:{
                "rating": 4.625, 
                "restaurant_id": 834828, 
                "pinyin_name": "nongqingkaochi", 
                "display_times": [ ], 
                "attrs": [ ], 
                "description": "精选全翅经美味香料腌制烘烤而成，入口鲜嫩多汁，回味无穷。", 
                "month_sales": 173, 
                "rating_count": 10, 
                "tips": "10评价 月售173份", 
                "image_path": "3dc88b341318461280ff1d72ee580f70jpeg", 
                "specifications": [
                    {
                        "values": [
                            "4只装", 
                            "6只装"
                        ], 
                        "name": "规格"
                    }
                ], 
                "server_utc": 1486459733, 
                "is_essential": false, 
                "attributes": [ ], 
                "item_id": "16840096069", 
                "limitation": { }, 
                "name": "浓情烤翅", 
                "satisfy_count": 9, 
                "activity": null, 
                "satisfy_rate": 90, 
                "specfoods": [
                    {
                        "original_price": null, 
                        "sku_id": "121379213637", 
                        "name": "浓情烤翅", 
                        "pinyin_name": "nongqingkaochi", 
                        "restaurant_id": 834828, 
                        "food_id": 508807826, 
                        "packing_fee": 0, 
                        "recent_rating": 4.25, 
                        "promotion_stock": -1, 
                        "price": 30, 
                        "sold_out": false, 
                        "recent_popularity": 81, 
                        "is_essential": false, 
                        "item_id": "16840096069", 
                        "checkout_mode": 1, 
                        "specs": [
                            {
                                "name": "规格", 
                                "value": "4只装"
                            }
                        ], 
                        "stock": 9979
                    }, 
                    {
                        "original_price": null, 
                        "sku_id": "121379214661", 
                        "name": "浓情烤翅", 
                        "pinyin_name": "nongqingkaochi", 
                        "restaurant_id": 834828, 
                        "food_id": 508807827, 
                        "packing_fee": 0, 
                        "recent_rating": 5, 
                        "promotion_stock": -1, 
                        "price": 44, 
                        "sold_out": false, 
                        "recent_popularity": 92, 
                        "is_essential": false, 
                        "item_id": "16840096069", 
                        "checkout_mode": 1, 
                        "specs": [
                            {
                                "name": "规格", 
                                "value": "6只装"
                            }
                        ], 
                        "stock": 9982
                    }
                ], 
                "category_id": 8006634
            }, 

        }
    },
    mounted() {

    },
    components: { switchButton, alertTip, loading, ratingStar,shopList,footGuide,buyCart },
    computed: {
        codeInStyleTag() {
            return `<style>${this.code}</style>`
        },

    }, mixins: [loadMore],
    methods: {
        async  loaderMore() {
            var sleep = function (time) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, time);
                })
            };
            await sleep(3000);
                console.log("loaderMore");
            this.list.push(this.listEnd);
            this.listEnd++;
        },
        ...mapMutations(
            ['SHOW']
        ),
        changeState(m) {
            this.stars += 1;
            this.s = !this.s;
            console.log("down" + m[0] + m[1]);
        },
        getLength() {
            let result = this.list.filter((_, index) => index <= 2);
            console.log(result);
            result = result.map((item) => item.length);//计算数组中元素的长度
            console.log(result);
            result = result.reduce((p, c) => p + c, 0);//求元素的长度和
            console.log(result);
            /* let length = this.list.filter((_, index) => index <= 2).map((item) => item.length).reduce((p, c) => p + c, 0);
             console.log(length);*/
        },


    }
}
</script>

<style>
.rating_star {
    margin: 1rem;
}
.a{
    margin-left: 60%;
}
</style>