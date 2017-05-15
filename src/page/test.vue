<template>
    <div>
        <button v-on:click="getLength">
            length</button>
        <div class="code" v-html="codeInStyleTag"></div>
        <br/>
        <switch-button :open="s" openText="S" closeText="N" @changeState="changeState" />
        <alert-tip alertText="hahaha" />
    </div>
</template>
<script>
import switchButton from '../components/switchButton.vue'
import alertTip from '../components/alertTip.vue'
export default {
    data() {
        return {
            list: [],
            code: '*{',
            s: false
        }
    },
    components: { switchButton, alertTip },
    computed: {
        codeInStyleTag() {
            return `<style>${this.code}</style>`
        }
    },
    methods: {
        changeState(m) {
            console.log("down"+m[0]+m[1]);
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