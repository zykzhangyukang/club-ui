<template>
    <Carousel v-model="value" loop>
        <CarouselItem>
            <div class="demo-carousel">1</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">2</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">3</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">4</div>
        </CarouselItem>
    </Carousel>
</template>
<script>
    export default {
        data () {
            return {
                value: 0
            }
        }
    }
</script>
<style scoped>
    .demo-carousel{
         height:200px;
         line-height:200px;
         text-align:center;
         color:#fff;
         font-size:20px;
         background:#eeeeee;
        margin-bottom: 20px;
    }
</style>