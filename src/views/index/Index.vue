<template>
    <Row :gutter="16">
        <Col span="18">
              <!-- 主要内容区域 -->
            <div class="main_content">
                <!-- 分类导航 -->
                <CatalogNav></CatalogNav>
                <!-- 帖子列表 -->
                <PostList></PostList>
            </div>
        </Col>
        <Col span="6">
            <div class="right_content">
                <!-- 引导卡片 -->
                <GuideNav></GuideNav>
                <!-- 用户信息 -->
                <UserInfoNav></UserInfoNav>
                <!-- 创建导航 -->
                <CreateNav></CreateNav>
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
    import CreateNav from '@/views/index/CreateNav'

    export default {
        name: "index.vue",
        components: {
            CreateNav,
            PostList,
            CatalogNav,
            Carousel,
            GuideNav,
            AdvertNav,
            UserInfoNav
        },
        data(){
            return{
                switchValue: true,
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.user.user;
            }
        },
    }
</script>

<style scoped>
</style>