<template>
    <Content class="layout-content">
        <Row :gutter="16">
            <Col span="18">
                <div class="main_content">
                    <!-- 分类导航 -->
                    <SectionNav :section-list="sectionList"/>
                    <!-- 帖子列表 -->
                    <PostList></PostList>
                </div>
            </Col>
            <Col span="6">
                <div class="right_content">
                    <!-- 引导卡片 -->
                    <GuideNav></GuideNav>
                    <!-- 用户信息 -->
                    <UserInfoNav class="ivu-mb-8"></UserInfoNav>
                    <!-- 创建导航 -->
                    <CreateNav></CreateNav>
                    <!-- 广告区域-->
                    <AdvertNav></AdvertNav>
                </div>
            </Col>
        </Row>
    </Content>
</template>

<script>
    import SectionNav from "@/views/index/SectionNav";
    import PostList from "@/views/index/PostList";
    import GuideNav from "@/layouts/GuideNav";
    import AdvertNav from "@/layouts/AdvertNav";
    import UserInfoNav from "@/layouts/UserInfoNav";
    import CreateNav from "@/views/index/CreateNav";
    import { getResource } from "@/apis";

    export default {
        name: "index",
        components: {
            CreateNav,
            PostList,
            SectionNav,
            GuideNav,
            AdvertNav,
            UserInfoNav
        },
        data() {
            return {
                sectionList: []
            }
        },
        created() {
            this.fetchResource();
        },
        methods: {
            fetchResource() {
                const cacheList = this.$store.state.index.sectionList;
                if(cacheList && cacheList.length > 0){
                    this.sectionList = cacheList;
                }else {
                    getResource().then(response => {
                        if(response.code === 200){
                            this.sectionList = response.result.sectionList;
                            // 缓存到vuex中
                            this.$store.commit("index/setSectionList", this.sectionList);
                        }
                    }).catch(error => {
                        console.error("Error fetching section list:", error);
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .layout-content {
        background: #f6f8fa !important;
        width: 1060px;
        margin: 20px auto;
        min-height: 1000px;
    }
</style>
