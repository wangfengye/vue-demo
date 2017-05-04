<template>
	<div>
<<<<<<< HEAD
		<transition name="router-fade" mode="out-in">
=======
				<h1>maple</h1>
		<transition name="router-fade" mode="out-in">

>>>>>>> ab87b1303ca39e27bbe10422b8c78f82dc5197ee
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>

export default {

}

</script>

<style lang="scss">
@import './style/common';
<<<<<<< HEAD
/*动画效果 页面跳转 透明三秒*/
=======
>>>>>>> ab87b1303ca39e27bbe10422b8c78f82dc5197ee
.router-fade-enter-active,
.router-fade-leave-active {
	transition: opacity .3s;
}

.router-fade-enter,
.router-fade-leave-active {
	opacity: 0;
}
</style>
