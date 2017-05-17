<template>
    <div class="city_container">
        <head-top goBack="true" :headTitle="cityname"></head-top>
        <form class="city_form">
            <div>
                <input type="search" placeholder="输入学校,商务楼,地址" class="city_input input_style" required v-model="inputValue" />
            </div>
            <div>
                <input type="submit" class="city_submit input_style" @click="postpois" value="提交" />
            </div>
        </form>
        <header v-if="historytitle" class="pois_search_history">搜索历史</header>
        <ul class="getpois_ul">
            <li v-for="(item, index) in placelist" @click='nextpage(index,item.geohash)' :key="index">
                <h4 class="pois_name ellipsis">{{item.name}}</h4>
                <p class="pois_address ellipsis">{{item.address}}</p>
            </li>
        </ul>
    </div>
</template>

<<script>
import headTop from '../components/headTop.vue'
import {getmeizi, currentcity, searchplace } from 'src/service/getData'
import { getStore, setStore } from 'src/config/mUtils'
export default {
  data () {
      return {
            inputVaule: '', // 搜索地址
            cityid: '', // 当前城市id
            cityname: '', // 当前城市名字
            placelist: [], // 搜索城市列表
            placeHistory: [], // 历史搜索记录
            historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
            placeNone: false, // 搜索无结果，显示提示信息
      }
  },
  mounted () {
        this.cityid =this.$route.params.cityid;
        //获取当前城市名字
        currentcity(this.cityid).then(res=>{
            this.cityname=res.name;
        });
        if (getStore('placeHistory')) {
            this.placelist=JSON.parse(getStore('placeHistory'));
        }
  },
  components: {
      headTop
  },
  computed: {
      
  },
  methods: {
      //发送搜索信息
      postpois(){
          if (this.inputValue) {
                  searchplace(this.cityid,this.inputValue).then(res=>{
                  this.historytitle =false;
                  this.placelist =res;
                  this.placeNone =res.leng?false:true;
              });
          }
      },
      /**
         * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
         * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
         */
      nexpage(index,geohash){
          let history =getStore('placeHistory');
          let choosePlace = this.placelist[index];
          if (history) {
              let checkrepeat =false;
              this.placeHistory = JSON.parse(history);
              this.placeHistory.forEach(item=>{
                  if (item.geohash ==geohash) {
                      checkrepeat = true;
                  }
              })
          }
      }
  }
}
</script>

<style lang="scss" scoped>
.city_container {
    padding-top: 2rem;
}
</style>