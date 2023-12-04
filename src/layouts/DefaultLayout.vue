<template>
    <Layout>
        <!-- 网站头部导航 -->
        <AppHeader></AppHeader>
        <!-- 主内容区域 -->
        <router-view></router-view>
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