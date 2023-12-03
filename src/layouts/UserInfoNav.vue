<template>
    <div class="user-info-card" v-if="currentUser">
        <div class="user-avatar">
            <Avatar :size="45" shape="square" :src="currentUser.avatar" icon="ios-person" />
        </div>
        <div class="user-info">
            <div class="user-text">
                <a class="custom-link" href="#">收藏 (0)</a>
                <Divider type="vertical" />
                <a class="custom-link" href="#">话题 (2)</a>
                <Divider type="vertical" />
                <a class="custom-link" href="#">关注 (5)</a>
            </div>
            <div class="user-description">
                <a class="username" href="#">
                    <span style="display: inline-block;width: 80px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
                           {{ currentUser.nickname }}
                    </span>
                    <Badge color="green" text="在线" class="online-status ivu-mr-4" />
                    <img width="18" height="18" :src="require('@/assets/img/silver.png')" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UserInfoCard',
        computed: {
            currentUser() {
                return this.$store.state.user.user;
            },
        },
    };
</script>

<style scoped>
    .user-info-card {
        display: flex;
        align-items: center;
        padding: 15px;
        background-color: #ffffff;
        /*border-radius: 8px;*/
        margin-bottom: 10px;
        border: 1px solid #e4e6eb;
    }

    .user-avatar {
        margin-right: 20px;
        align-self: flex-start;
    }

    .user-info {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .user-text {
        font-size: 11px;
        color: #515a6e!important;
        margin-bottom: 8px;
    }
    .user-text a{
        font-size: 11px;
        color: #515a6e!important;
    }

    .user-description {
        font-size: 11px;
        color: #515a6e!important;
        margin-bottom: 12px;
    }

    .username {
        display: flex;
        align-items: center;
        color: #252933;
        font-size: 11px;
        text-decoration: underline;
    }

    .username img {
        margin-left: 5px;
        width: 18px;
        height: 18px;
    }

    .online-status {
        font-size: 11px;
    }
</style>
