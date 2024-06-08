<template>
    <div class="user-info-card" v-if="currentUser">
        <div class="user-avatar">
            <Avatar :size="50" shape="square" :src="currentUser.avatar" icon="ios-person" />
        </div>
        <div class="user-info">
            <div class="user-description">
                <a class="username" href="#">
                    <span class="nickname">{{ currentUser.nickname }}</span>
                    <Badge :color="isOnline ? 'green' : 'gray'" :text="isOnline ? '在线' : '离线'" class="online-status" />
                </a>
            </div>
            <div class="user-text">
                <a class="custom-link" href="#">收藏 ({{ currentUser.collectCount }})</a>
                <a class="custom-link" href="#">关注 ({{ currentUser.followCount }})</a>
                <a class="custom-link" href="#">粉丝 (2)</a>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'UserInfoCard',
        computed: {
            currentUser() {
                return this.$store.state.user.info;
            },
            isOnline() {
                return this.$store.state.user.isOnline;
            }
        }
    };
</script>

<style scoped>
    .user-info-card {
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: #ffffff;
        transition: box-shadow 0.3s ease;
        border: 1px solid #eee;
    }

    .user-avatar {
        margin-right: 15px;
    }

    .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .user-description {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    .username {
        display: flex;
        align-items: center;
        color: #333;
        font-size: 12px;
        font-weight: 600;
        text-decoration: none;
    }

    .nickname {
        max-width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .online-status {
        margin-left: 10px;
        font-size: 12px;
    }

    .user-text {
        display: flex;
        gap: 10px;
        font-size: 12px;
        color: #666;
    }

    .custom-link {
        color: #666;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .custom-link:hover {
        color: #333;
    }
</style>
