<template>
    <div>
        <ul>
            <router-link :to="{path:item.url}" v-for="item in list" tag='li'>{{item.title}}</router-link>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [{
                url: '/elmpage',
                title: '饿了吗'
            },
            {
                url: '/fade',
                title: '动画'
            },
            {
                url: '/resume',
                title: '简历'
            },
            {
                url: '/god',
                title: '上帝造人'
            },
            {
                url:'/snake',
                title:'贪吃蛇'
            }]
        }
    }
}
</script>