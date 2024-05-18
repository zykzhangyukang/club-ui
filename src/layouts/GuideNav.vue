<template>
    <div class="guide_nav" v-if="!currentUser">
        <strong class="title">Club = way to explore</strong>
        <p class="desc">Club 是一个关于分享和探索的地方</p>
        <Divider/>
        <div class="wrapper">
            <Button style="margin-bottom: 10px;margin-top: 10px" @click="this.$router.push('/register')">现在注册</Button>
            <p>已注册用户请
                <a @click="this.$router.push('/login')">登录</a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        computed:{
            currentUser(){
                return this.$store.state.user.info;
            }
        },
    }
</script>

<style scoped>
    .guide_nav {
        padding: 10px;
        background: #ffffff;
        height: 158px;
        border: 1px solid #eee;
        cursor: pointer;
        margin-bottom: 20px;
    }

    .ivu-divider-horizontal {
        margin: 10px 0!important;
    }
    .title{
    }
    .desc{
        font-size: 12px;
        color: #cccccc;
        font-family: 宋体,serif;
    }
    .wrapper{
        text-align: center;
    }
</style>