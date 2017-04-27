<template>
    <div class="shoplist_container">
        <head-top signin-up='home'>
            <span slot="logo" class="head_logo">maple</span>
        </head-top>
        <loading v-show="showloading"></loading>
        <ul v-load-more="loaderMore" v-if="list.length" type="1">
            <li @click="showMessage" v-for="item in list">
                <img :src="item.url" />
    
            </li>
        </ul>
            <footer class="loader_more" v-show="showloading">正在加载更多...</footer>
    </div>

</template>


<script>
import headTop from '../components/header/head'
import loading from '../components/common/loading'
import { getmeizi, currentcity, searchplace } from 'src/service/getData'
import { loadMore, getImgPath } from '../components/common/mixin'
export default {
    data() {
        return {
            list: [],
            count: 5,
            page: 1,
            showloading: true,

        }
    },  
    mounted() {
        this.initData();
        //   this.testMeizi();//测试
    },
    mixins: [loadMore, getImgPath],
    methods: {
        async initData() {
            await getmeizi(this.count, this.page).then(res => { this.list = res.results });
            this.showloading = false;
        },
        async loaderMore() {
            this.showloading = true;
            this.page += 1;
            await getmeizi(this.count, this.page).then(res => {
                this.list = [...this.list, ...res.results];

            })
            this.showloading = false;
        },
        showMessage(){

        },


        //测试代码
        async load() {//模拟加载 
            try {
                console.log("load---start");
                await this.sleep(4000);
                console.log("load---end");
                this.showloading = false;
                console.log("load" + this.showloading);
            }
            catch (e) {
                console.log("error" + e);
            }
        },
        sleep(time) {
            return new Promise((resolve, reject) => {
                setTimeout(function () { resolve(); }, time);
            });
        },
        testMeizi() {
            getmeizi().then(res => { console.log("testMeizi" + res.error); return res.results })
                .then(res => { console.log("testMeizi" + res); return res[0].url })
                .then(res => { console.log("testMeizi" + res); })
        }


    },
    components: {
        headTop,
        loading

    },
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
img {
    width: 100%;
    height: 100%;
}
	.loader_more{
		@include font(0.6rem, 3);
		text-align: center;
	    color: #999;
	}
</style>