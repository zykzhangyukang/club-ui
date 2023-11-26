<template>
    <div class="navbar">
        <div class="container">
            <div class="left-content">
                <div class="logo" @click="goHome"></div>
                <div class="menu">
                    <a href="#" @click="goHome"> <Icon type="ios-home" />首页</a>
                    <a href="#"> <Icon type="ios-keypad" />主题</a>
                </div>
            </div>
            <div class="right-content">
                <!-- 未登录态 -->
                <a href="#" @click="goToLogin" v-if="!currentUser">登录</a>
                <a href="#" @click="goToRegister" v-if="!currentUser">注册</a>
                <!-- 登录态 -->
                <a href="#"  v-if="currentUser"><Icon style="font-size: 15px" type="md-notifications-outline" /> 通知</a>
                <a href="#" @click="logout" v-if="currentUser"><Icon type="md-log-out" />登出</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppHeader.vue",
        components:{
        },
        methods: {
            goHome() {
                this.$router.push('/');
            },
            goToLogin() {
                this.$router.push('/login');
            },
            goToRegister() {
                this.$router.push('/register');
            },
            logout(){
                this.$store.commit('user/logout');
                this.$Message.success('注销登录成功！');
                this.$router.push('/login')
            }
        },
        computed:{
            currentUser(){
                return this.$store.state.user.user;
            }
        },
    }
</script>

<style scoped>

    .navbar {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        color: white;
        padding: 10px;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
        height: 48px;
    }

    /* 容器样式 */
    .container {
        width: 1076px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    /* 左侧内容样式 */
    .left-content {
        display: flex;
        align-items: center;
    }

    /* Logo 样式 */
    .logo {
        /* 可以添加样式 */
        margin-right: 20px; /* 添加间距 */
        width: 100px;
        height: 30px;
        border-radius: 3px;
        background-image: url("../assets/logo.png");
        background-size: cover;
        background-position: center;
        cursor: pointer;
    }

    /* 菜单样式 */
    .menu {
        /* 可以添加样式 */
    }

    /* 菜单项样式 */
    .menu a {
        color: #515a6e;
        text-decoration: none;
        margin-right: 30px; /* 添加间距 */
    }

    /* 最后一个菜单项样式 */
    .menu a:last-child {
        margin-right: 0;
    }

    /* 右侧内容样式 */
    .right-content {
        display: flex;
    }

    /* 右侧链接样式 */
    .right-content a {
        color: #515a6e;
        text-decoration: none;
        margin-right: 20px; /* 右侧链接间距 */

        align-items: center; /* 垂直居中 */
    }

    /* 最后一个右侧链接样式 */
    .right-content a:last-child {
        margin-right: 0;
    }

    .menu a:hover {
        color: #2d8cf0; /* 悬停时颜色变化 */
    }
</style>