<template>

    <div>
        <ul>
            <li @click="go">饿了么</li>
            <router-link class="item" :to="{path:item.url}" v-for="item in list" tag='li'>{{item.title}}</router-link>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [/*{
                url: '/elmhome',
                title: '饿了吗'
            },
            {
                url: '/fade',
                title: '动画'
            },*/
            {
                url: '/resume',
                title: '简历'
            },
            {
                url: '/god',
                title: '上帝造人'
            },
            {
                url: '/snake',
                title: '贪吃蛇'
            }]
        }
    },
    methods: {//跳转到另一项目路径
        go(){
            location= "https://wangfengye.github.io/elm"
        }
    }
}
</script>
<style lang='scss' scoped>
@import 'src/style/mixin';
ul {
    text-align: center;
    li {
        background-color: $blue;
        border-radius: .2rem;
        color: white;
        text-align: center;
        width: 50%;
        margin-top: 1rem;
        margin-left: 25%;
        padding: .2rem;
    }
}
</style>
