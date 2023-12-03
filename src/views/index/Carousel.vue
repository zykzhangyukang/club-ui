<template>
    <div class="carousel_wrapper">
    <Carousel v-model="value" loop>
        <CarouselItem>
            <div class="demo-carousel">
                轮播图1
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
                轮播图2
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
                轮播图3
            </div>
        </CarouselItem>
    </Carousel>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value: 0
            }
        }
    }
</script>
<style scoped>
    .demo-carousel {
        height: 200px;
        line-height: 200px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background: #eeeeee;
        border: 1px solid #efefef;
        margin-bottom: 20px;
    }
    .carousel_wrapper{
        background: #ffffff;
        border: 1px solid #e4e6eb;
    }

</style>