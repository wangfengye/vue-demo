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
       <shop-list  geohash="wtw3sjz9p6xf"></shop-list>
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
export default {
    data() {
        return {
            list: [0, 1],
            code: '*{',
            s: false,
            stars: 0,
            listEnd: 3

        }
    },
    mounted() {

    },
    components: { switchButton, alertTip, loading, ratingStar,shopList,footGuide },
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
</style>