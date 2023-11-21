<template>
    <Layout>
        <!-- 网站头部导航 -->
        <AppHeader></AppHeader>
        <Content class="layout-content">
            <Row :gutter="16">
                <Col span="18">
                    <!-- 主要内容区域 -->
                    <div class="main_content">
                        <router-view/>
                    </div>
                </Col>
                <Col span="6">
                    <div class="right_content">
                        <!-- 引导卡片 -->
                        <GuideNav></GuideNav>
                        <div class="sep20"></div>
                        <!-- 广告区域-->
                        <AdvertNav></AdvertNav>
                    </div>
                </Col>
            </Row>
        </Content>

        <!-- 网站页尾部分 -->
        <AppFooter></AppFooter>
    </Layout>
</template>

<script>
    import AppHeader from "@/layout/AppHeader";
    import AppFooter from "@/layout/AppFooter";
    import GuideNav from "@/layout/GuideNav";
    import AdvertNav from "@/layout/AdvertNav";

    export default {
        name: 'DefaultLayout',
        components: {
            AppHeader,
            AppFooter,
            GuideNav,
            AdvertNav
        },
    }
</script>
<style scoped>
    .layout-content {
        background: #f6f8fa !important;
        width: 1060px;
        margin: 20px auto;
    }
    .main_content{
        padding: 20px;
        background: #fff!important;
        border: 1px solid #eee;
    }
    .sep20{
        height: 20px;
    }
</style>