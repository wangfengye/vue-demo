<template>
    <div class="rating_container">
        <section class="star_container">
            <svg class="grey_fill" v-for="num in 5">
                <use xlink:href="#star"></use>
            </svg>
        </section>
         <div :style="'width:' + rating*2/5 + 'rem'" class="star_overflow">
            <section class="star_container">
                <svg class="orange_fill" v-for="num in 5" :key="num">
                    <use xlink:href="#star"></use>
                </svg>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['rating']
}
</script>

<style lang='scss' scoped>
@import '../style/mixin';
.rating_container {
    position: relative;
    @include wh(2rem, .4rem);
    .star_overflow {
        overflow: hidden;
        position: relative;
        height: 100%;
    }
    .star_container {
        position: absolute;
        display: flex;
        width: 2rem;
        height: .4rem;
        top: -.02rem;
        left: -.02rem;
        .grey_fill {
            fill: #d1d1d1;
        }
        .orange_fill {
            fill: #ff9a0d;
        }
    }
}
</style>