<template>
    <Content class="layout-content">
        <Row :gutter="16">
            <Col span="24">
                <!-- 主要内容区域 -->
                <div class="main_content">
                    <div class="setting-wrapper">
                        <Menu  active-name="1">
                            <MenuGroup title="消息中心">
                                <MenuItem name="1">
                                    <Icon type="md-quote" />
                                    回复我的
                                </MenuItem>
                                <MenuItem name="2">
                                    <Icon type="md-at" />
                                    @ 我的
                                </MenuItem>
                                <MenuItem name="3">
                                    <Icon type="md-thumbs-up" />
                                    收到的赞
                                </MenuItem>
                                <MenuItem name="4">
                                    <Icon type="logo-rss" />
                                    系统通知
                                </MenuItem>
                                <MenuItem name="5">
                                    <Icon type="md-text" />
                                    我的消息
                                </MenuItem>
                            </MenuGroup>
                        </Menu>
                    </div>
                </div>
            </Col>
        </Row>
    </Content>
</template>

<script>
    export default {
        name: "Notification.vue",
        methods:{
            onChange(tab){

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

    .ivu-menu-vertical{
        width: 150px!important;
    }
    .layout-content {
        background: #f6f8fa !important;
        width: 1060px;
        margin: 20px auto;
    }
</style>