<template>
    <Row :gutter="16">
        <Col span="18">
              <!-- 主要内容区域 -->
            <div class="main_content">
                <!-- 轮播图部分 -->
                <Carousel></Carousel>
                <!-- 分类导航 -->
                <CatalogNav></CatalogNav>
                <!-- 帖子列表 -->
                <PostList></PostList>
            </div>
        </Col>
        <Col span="6">
            <div class="right_content">
                <!-- 用户信息 -->
                <UserInfoNav></UserInfoNav>
                <!-- 引导卡片 -->
                <GuideNav></GuideNav>
                <!-- 广告区域-->
                <AdvertNav></AdvertNav>
            </div>
        </Col>
    </Row>
</template>

<script>
    import CatalogNav from "@/views/index/SectionNav";
    import PostList from "@/views/index/PostList";
    import Carousel from "@/views/index/Carousel";
    import GuideNav from "@/layouts/GuideNav";
    import AdvertNav from "@/layouts/AdvertNav";
    import UserInfoNav from "@/layouts/UserInfoNav";

    export default {
        name: "index.vue",
        components: {
            PostList,
            CatalogNav,
            Carousel,
            GuideNav,
            AdvertNav,
            UserInfoNav
        },
        computed: {
            currentUser() {
                return this.$store.state.user.user;
            }
        },
    }
</script>

<style scoped>
    .main_content {
        padding: 20px;
        background: #fff !important;
        border: 1px solid #eee;
    }
    .sep20 {
        height: 20px;
    }
</style>