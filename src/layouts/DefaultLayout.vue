<template>
    <Layout>
        <!-- 网站头部导航 -->
        <AppHeader></AppHeader>
        <!-- 主内容区域 -->
        <Content class="layout-content">
            <router-view></router-view>
        </Content>
        <!-- 网站页尾部分 -->
        <AppFooter></AppFooter>
    </Layout>
</template>

<script>
    import AppHeader from "@/layouts/AppHeader";
    import AppFooter from "@/layouts/AppFooter";

    export default {
        name: 'DefaultLayout',
        components: {
            AppHeader,
            AppFooter,
        },
    }
</script>
<style scoped>
    .layout-content {
        background: #f6f8fa !important;
        width: 1060px;
        margin: 20px auto;
    }
</style>