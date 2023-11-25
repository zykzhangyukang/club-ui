<template>
    <div class="navbar">
        <div class="container">
            <div class="left-content">
                <div class="logo"></div>
                <div class="menu">
                    <a href="#" @click="goHome"> <Icon type="ios-home" />首页</a>
                    <a href="#"> <Icon type="ios-keypad" />主题</a>
                </div>
            </div>
            <div class="right-content" v-if="!currentUser">
                <a href="#" @click="goToLogin" >登录</a>
                <a href="#" @click="goToRegister">注册</a>
            </div>
            <div  class="right-content" v-else>
                <Notification></Notification>
                <Dropdown>
                    <a href="javascript:void(0)">
                        <Avatar class="avatar"  shape="square" icon="ios-person" :src="currentUser.avatar"></Avatar>
                    </a>
                    <template #list>
                        <DropdownMenu>
                            <DropdownItem>个人资料</DropdownItem>
                            <DropdownItem>消息中心</DropdownItem>
                            <DropdownItem>我的关注</DropdownItem>
                            <DropdownItem divided @click="logout">注销登录</DropdownItem>
                        </DropdownMenu>
                    </template>
                </Dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import Notification from "@/layouts/Notification";
    import MyWebSock from "@/utils/socket";

    export default {
        name: "AppHeader.vue",
        components:{
            Notification
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
            }
        },
        computed:{
            currentUser(){
                return this.$store.state.user.user;
            }
        },
        created() {
            if(this.$store.state.user.user){
                this.stompClient = new MyWebSock();
            }
        },
        beforeUnmount() {
            if(this.stompClient){
                this.stompClient.disconnect()
            }
        }
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
    }

    /* 菜单样式 */
    .menu {
        /* 可以添加样式 */
    }

    /* 菜单项样式 */
    .menu a {
        color: #515a6e;
        text-decoration: none;
        margin-right: 20px; /* 添加间距 */
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