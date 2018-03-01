<template>
    <div>
        <head-top head-title="神造你时加了什么魔法～" />
    
        <div class="content" v-if="!isResult">
             <div id="title-img" v-html="title"></div>
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
            <h5><strong :style="{color:color}">{{name}}</strong>被上帝制造时...</h5>
            <div id="result-img" v-html="showImg(image)"></div>

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
            title: ''
        }
    },
    components: { headTop },
    mounted(){
        this.title = this.showImg('http://play.7724.com/olgames/rhsczlw//images/start_bg.jpg')
    },
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
            let rand = Math.floor(Math.random() * 17) + 1;
            this.image = "http://play.7724.com/olgames/rhsczlw//images/" + rand + ".jpg";
            this.getRandomColor();

            this.isResult = true;
        },
        
        showImg(url) {
		    var frameid = 'frameimg' + Math.random();
		    window.img = '<img id="img" style="width:100%" src=\'' + url + '?' + Math.random() + '\' /><script>window.onload = function() { parent.document.getElementById(\'' + frameid + '\').height = (document.getElementById(\'img\').height*1.1)+\'px\'; }<' + '/script>';
		    return '<iframe id="' + frameid + '" src="javascript:parent.img;" frameBorder="0" scrolling="no" width="100%"></iframe>';
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
    #result-img {
        padding-top: 3rem;
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

