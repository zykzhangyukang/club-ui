<template>
    <Header>
        <Menu mode="horizontal" theme="light" active-name="1" class="layout_menu">
            <div class="layout-logo" @click="this.$router.push('/')">
            </div>
            <div class="layout-nav">
                <MenuItem name="1" @click="this.$router.push('/')">
                    <Icon type="ios-navigate"></Icon>
                    首页
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-keypad"></Icon>
                    话题
                </MenuItem>
                <div class="user_info_wrapper">
                    <a style="margin-left: 20px;color: #303030;cursor: pointer" @click="this.$router.push('/login')">登录</a>
                    <a style="margin-left: 20px;color: #303030;cursor: pointer" @click="this.$router.push('/register')">注册</a>
                </div>
            </div>
        </Menu>
    </Header>
</template>

<script>
    export default {
        name: "AppHeader.vue"
    }
</script>

<style scoped>
    .ivu-layout-header {
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
        height: 48px;
    }

    .layout-logo {
        cursor: pointer;
        width: 100px;
        height: 30px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 9px;
        left: 20px;
        margin-right: 80px;
        background-image: url("https://www.imooc.com/static/img/index/logo2020.png");
        background-size: cover;
        background-position: center;
    }

    .user_info_wrapper {
        float: right;
        position: relative;
    }

    .layout-nav {
        margin: 0 20px 0 auto;
        height: 48px;
        line-height: 48px;
        background: #fff;
    }

    .ivu-menu-horizontal.ivu-menu-light:after {
        background: #ffffff;
    }

    .layout_menu {
        width: 1060px;
        height: 48px;
        margin: 0 auto;
        background: #ffffff;
    }

    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal
    .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
        color: #2d8cf0;
        border-bottom: 2px solid #ffffff;
    }
</style>