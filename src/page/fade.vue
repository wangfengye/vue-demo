/*过度动画*/
<template>
    <div>
        <button v-on:click="show =!show">{{showText}}</button>
        <!-- <transition name="fade">
                    <p v-if="show">繁星</p>
                </transition>-->
        <transition name="bounce" appear="true">
            <p v-if="show">bounce</p>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: true,
            showText: 'Toggle',
        }
    }
}
</script>
<style>
/**/

.fade-enter-active,
.fade-leave-active {
    transition: all 1s;
}





/*设置 进入动画初始状态,移除动画结束状态*/

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.bounce-enter-active {
    animation: bounce-in 3s;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
        motion-rotation: x(45);
    }
    50% {
        transform: scale(0.5);
    }
    100% {
        transform: scale(1);
    }
}
</style>