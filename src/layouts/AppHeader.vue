<template>
    <div class="navbar">
        <div class="container">
            <div class="left-content">
                <div class="logo" @click="getHomeReload()"></div>
                <div class="menu">
                    <a :class="[this.$route.meta.title === '首页' ? 'active': '']" href="#" @click="goHome"><Icon type="md-home" />首页</a>
                    <a href="#"><Icon type="md-paper" />文章</a>
                    <a href="#"> <Icon type="ios-keypad" />话题</a>
                </div>
            </div>
            <div class="right-content">
                <!-- 未登录态 -->
                <a href="#" @click="goToLogin" v-if="!currentUser">登录</a>
                <a href="#" @click="goToRegister" v-if="!currentUser">注册</a>
                <!-- 登录态 -->
                <a href="javascript:void(0)"  v-if="currentUser"> <Notification></Notification></a>
                <a href="#"   style="color: #515a6e"  @click="goToSettings" v-if="currentUser">设置</a>
                <a href="#" @click="logout" v-if="currentUser">登出</a>
            </div>
        </div>
    </div>
</template>

<script>
    import Notification from "@/layouts/Notification";
    export default {
        name: "AppHeader.vue",
        components:{
            Notification
        },
        methods: {
            goHome() {
                this.$router.push('/');
            },
            getHomeReload(){
              // window.location.href = '/'
                this.$router.push('/');
            },
            goToSettings() {
                this.$router.push('/settings');
            },
            goToLogin() {
                this.$router.push('/login');
            },
            goToRegister() {
                this.$router.push('/register');
            },
            logout(){
                this.$store.commit('user/logout');
                this.$Message.success('注销成功！');
                this.$router.push('/')
            }
        },
        computed:{
            currentUser(){
                return this.$store.state.user.info;
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
        width: 1080px;
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
        /*background-image: url("../assets/logo.png");*/
        background-image: url("https://ioss-bucket.oss-cn-shenzhen.aliyuncs.com/club/cdn/imgs/logo.png");
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
        color: #666;
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
        color: #666;
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
    .active{
        color: #2d8cf0!important;
    }
</style>