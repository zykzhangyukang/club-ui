<template>

    <!-- 轮播图部分 -->
    <Carousel></Carousel>

    <!-- 分类导航 -->
    <CatalogNav></CatalogNav>

    <!-- 帖子列表 -->
    <PostList></PostList>

</template>

<script>
    import CatalogNav from "@/views/CatalogNav";
    import PostList from "@/views/PostList";
    import Carousel from "@/views/Carousel";
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