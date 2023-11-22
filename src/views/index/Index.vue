<template>

    <!-- 轮播图部分 -->
    <Carousel></Carousel>

    <!-- 分类导航 -->
    <CatalogNav></CatalogNav>

    <!-- 帖子列表 -->
    <PostList></PostList>

</template>

<script>
    import CatalogNav from "@/views/index/CatalogNav";
    import PostList from "@/views/index/PostList";
    import Carousel from "@/views/index/Carousel";
    export default {
        name: "index.vue",
        components:{
            PostList,
            CatalogNav,
            Carousel
        }
    }
</script>

<style scoped>

</style>