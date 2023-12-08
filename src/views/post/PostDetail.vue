<template>
    <Content class="layout-content">
        <Row :gutter="16">
            <Col span="18">
                <div class="main_content">
                    <h1>详情</h1>
                </div>
            </Col>
            <Col span="6">
                <div class="right_content">
                    <GuideNav></GuideNav>
                    <AdvertNav></AdvertNav>
                </div>
            </Col>
        </Row>
    </Content>
</template>

<script>
    import GuideNav from "@/layouts/GuideNav";
    import AdvertNav from "@/layouts/AdvertNav";
    export default {
        components:{
            GuideNav,
            AdvertNav
        }
    }
</script>
<style scoped>
    .main_content {
        padding: 20px;
        background: #fff !important;
        border: 1px solid #e4e6eb;
    }
    .layout-content {
        background: #f6f8fa !important;
        width: 1060px;
        margin: 20px auto;
    }
</style>