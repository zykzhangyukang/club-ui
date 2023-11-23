<template>
    <Header>
        <Menu mode="horizontal" theme="light" active-name="1" class="layout_menu">
            <div class="layout-logo" @click="goHome">
            </div>
            <div class="layout-nav">
                <MenuItem name="1" @click="goHome">
                    <Icon type="ios-home" />
                    首页
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-keypad" />
                    话题
                </MenuItem>
                <div class="user_info_wrapper">
                    <a  style="font-size: 20px;color: #303030;height: 100%;display: inline-block;vertical-align: center"><Icon type="md-notifications-outline" /></a>
                    <a  class="auth-link" @click="goToLogin">登录</a>
                    <a  class="auth-link" @click="goToRegister">注册</a>
                </div>
            </div>
        </Menu>
    </Header>
</template>

<script>
    export default {
        name: "AppHeader.vue",
        methods: {
            goHome() {
                this.$router.push('/');
            },
            goToLogin() {
                this.$router.push('/login');
            },
            goToRegister() {
                this.$router.push('/register');
            }
        }
    }
</script>

<style scoped>
    .ivu-layout-header {
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
        height: 48px;
        margin: 0;
        padding: 0;
    }

    .layout-logo {
        cursor: pointer;
        width: 100px;
        height: 30px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 9px;
        left: 5px;
        margin-right: 20px;
        background-image: url("../assets/logo.png");
        background-size: cover;
        background-position: center;
    }

    .user_info_wrapper {
        float: right;
        position: relative;
        text-align: center;
    }

    .layout-nav {
        margin: 0 20px 0 auto;
        height: 48px;
        line-height: 48px;
        background: #ffffff;
        width: 100%;
    }

    .ivu-menu-horizontal.ivu-menu-light:after {
        background: #ffffff;
    }
    .layout_menu {
        width: 1076px;
        height: 48px;
        margin: 0 auto;
        background: green;
        z-index: 0;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal
    .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
        color: #2d8cf0;
        border-bottom: 2px solid #ffffff;
    }

    .auth-link {
        margin-left: 20px;
        color: #303030;
        cursor: pointer;
        height: 100%;
        display: inline-block;
    }
</style>