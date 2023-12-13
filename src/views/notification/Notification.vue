<template>
    <Content class="layout-content">
        <Row :gutter="16">
            <Col span="24">
                <!-- 主要内容区域 -->
                <div class="main_content" >
                    <Tabs :animated="false" @on-click="tabClick" size="large">
                        <TabPane label="回复我的" name="/notification/reply"></TabPane>
                        <TabPane label="@ 我的" name="/notification/at"></TabPane>
                        <TabPane label="收到的赞" name="/notification/zan"></TabPane>
                        <TabPane label="系统消息" name="/notification/system"></TabPane>
                        <TabPane label="我的私信" name="/notification/myMsg"></TabPane>
                    </Tabs>
                    <router-view/>
                </div>
            </Col>
        </Row>
    </Content>
</template>

<script>
    export default {
        name: "Notification.vue",
        methods: {
            tabClick(path) {
                this.$router.push({
                    path: path,
                });
            }
        }
    }
</script>

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