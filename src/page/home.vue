<template>
<div>
    <ul>
        <router-link :to="{path:item.url}" v-for="item in list" tag='li' >{{item.title}}</router-link>
    </ul>
</div>
</template>
<script>
export default{
    data(){
        return{
            list:[{
                url:'/fade',
                title:'动画'
            },
            {
                url:'/resume',
                title:'简历'
            }]
        }
    }
}
</script>