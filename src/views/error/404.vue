<template>
    <Content class="layout-content">
        <Row :gutter="16">
            <Col span="24">
                <div class="main_content">
                    <Exception type="404" img="https://ioss-bucket.oss-cn-shenzhen.aliyuncs.com/club/cdn/imgs/icon-404-color.svg" desc="抱歉，你访问的页面不存在！" />
                </div>
            </Col>
        </Row>
    </Content>
</template>
<style scoped>
    .main_content {
        padding: 20px;
        background: #fff !important;
        border: 1px solid #eee;
    }

    .layout-content {
        background: #f6f8fa !important;
        width: 1060px;
        margin: 20px auto;
    }
</style>