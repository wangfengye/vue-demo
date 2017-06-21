<template>
    <div>
        <head-top head-title="神造你时加了什么魔法～" />
    
        <div class="content" v-if="!isResult">
            <img src="http://url.pcarzh.cn/gameTest/0531shangdi/style/thumb.png" />
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">姓名</label>
                    </div>
                    <div class="weui-cell__hd">
                        <input type="text" maxlength="4" placeholder="请输入姓名" class="weui-input" v-model="name" />
                    </div>
                </div>
            </div>
            <div class="button weui-btn-area" @click="getResult()">
                <a class="weui-btn " href="javascript:" id="showTooltips">提交</a>
            </div>
        </div>
        <div class="result" v-if="isResult">
            <img :src="image" />
            <h5>
                <strong :style="{color:color}">{{name}}</strong>被上帝制造时...</h5>
        </div>
    </div>
</template>

<script>
import headTop from 'src/components/headTop'
export default {
    data() {
        return {
            isResult: false,
            name: '',
            image: '',
            color: "#ff0000",
        }
    },
    components: { headTop },
    methods: {
        getRandomColor() {
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += '0123456789abcdef'[Math.floor(Math.random() * 16)];
            }

            this.color = color
        },
        getResult() {
            console.log("onclick");
            let rand = Math.floor(Math.random() * 32) + 1;
            this.image = "http://url.pcarzh.cn/gameTest/0531shangdi/sucai/" + rand + ".png";
            this.getRandomColor();

            this.isResult = true;
        }

    }
}
</script>

<style lang='scss' scoped>
@import 'src/style/weui';
@import 'src/style/mixin';
.content {
    padding-top: 2rem;
    img {
        padding-top: .2rem;
        padding-left: 20%;
        width: 60%;
    }
    div {
        a {
            background-color: $blue;
        }
    }
}

.result {
    padding-top: 2rem;
    img {
        padding-left: .2rem;
        width: 100%;
    }
    h5 {
        position: absolute;
        top: 4rem;
        left: 1rem;
        strong {
            color: greenyellow
        }
    }
}
</style>

