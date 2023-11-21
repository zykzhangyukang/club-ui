<template>
    <!-- 分类导航 -->
    <CatalogNav></CatalogNav>

    <!-- 帖子列表 -->
    <PostList></PostList>

</template>

<script>
    import CatalogNav from "@/views/CatalogNav";
    import PostList from "@/views/PostList";
    export default {
        name: "index.vue",
        components:{
            PostList,
            CatalogNav
        }
    }
</script>

<style scoped>

</style>