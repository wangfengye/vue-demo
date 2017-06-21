<template>
    <div>
        <head-top head-title="神造你时加了什么魔法～" />
    
        <div class="content" v-if="!isResult">
            <img src="http://url.pcarzh.cn/gameTest/0531shangdi/style/thumb.png" />
            	<div >
					<label>姓名</label>
					<input type="text"  v-model="name" maxlength="4" placeholder="请输入姓名">
				</div>
                <button @click="getResult()">确定</button>
        </div>
        <div class="result" v-if="isResult">
            <h5>{{name}}被上帝制造时...</h5>
            <img :src="image" />
        </div>
    </div>
</template>

<script>
import headTop from 'src/components/headTop'
export default {
    data() {
        return {
            isResult:false,
            name:'',
            image:'',
        }
    },
    components: { headTop },
    methods: {
        getResult(){
            console.log("onclick");
			let rand = Math.floor(Math.random() * 32)+1;
            this.image ="http://url.pcarzh.cn/gameTest/0531shangdi/sucai/"+rand+".png"; 
            this.isResult =true;
        }
    }
}
</script>

<style lang='scss' scoped>
@import 'src/style/mixin';
.content {
    padding-top: 2rem;
    img {
        padding-top: .2rem;
        padding-left: 20%;
        width: 60%;
    }
}

.result {
    padding-top: 2rem;
    img {
        padding-left: .2rem;
        width: 100%;
    }
}
</style>

