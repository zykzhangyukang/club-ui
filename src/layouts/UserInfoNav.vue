<template>
    <div class="user_info_nav" v-if="currentUser">
        <Row>
            <Col span="6">
            <Avatar :size="48" shape="square" :src="currentUser.avatar" icon="ios-person"  />
            </Col>
            <Col span="18">
                <div class="text_wrapper">
                    <a href="#">收藏 (0)</a>
                    <Divider type="vertical" />
                    <a href="#">话题 (2)</a>
                    <Divider type="vertical" />
                    <a href="#">关注 (5)</a>
                </div>
                <a style="font-size: 12px;margin-left: 10px;margin-top: 6px;display: inline-block;color: #515a6e;font-family: 'Comic Sans MS',serif">
                   {{currentUser.username}}
                </a>
            </Col>
        </Row>
        <Divider/>
        <div>
            <span style="font-size: 11px;margin-top: 5px;display: inline-block"> <Badge color="green" text="在线状态" ></Badge> </span>
        </div>
    </div>
</template>

<script >
    export default {
        name: 'UserInfoNav',
        components:{
        },
        data() {
            return {
            }
        },
        computed:{
            currentUser(){
                return this.$store.state.user.user;
            },
            noReadCount() {
                return this.$store.state.notification.noRead
            }
        },
        methods:{
        }
    }
</script>

<style scoped>
    .user_info_nav{
        padding: 10px;
        background: #ffffff;
        border: 1px solid #eee;
        cursor: pointer;
        margin-bottom: 20px;
    }
    .text_wrapper{
        margin-top: 2px;
        text-align: center;
    }
    .text_wrapper a{
        font-size: 11px;
        color: #515a6e;
    }
    .ivu-divider-horizontal {
        margin: 10px 0!important;
    }
</style>