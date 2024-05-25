<template>
    <Dropdown>
        <span href="javascript:void(0)">
             <Badge  :count="totalCount" :class-name="'badge_count'" :overflow-count="9">
                   <Icon type="md-notifications-outline" style="font-size: 20px" />
            </Badge>
        </span>
        <template #list>
            <DropdownMenu>
                <DropdownItem @click="getToNotification('/notification/reply')"><Badge :count="replyCount" :class-name="'badge_count'">回复我的</Badge></DropdownItem>
                <DropdownItem @click="getToNotification('/notification/at')"><Badge :count="atCount" :class-name="'badge_count'">@ 我的</Badge></DropdownItem>
                <DropdownItem @click="getToNotification('/notification/zan')"><Badge :count="zanCount" :class-name="'badge_count'">收到的赞</Badge></DropdownItem>
                <DropdownItem @click="getToNotification('/notification/system')"><Badge :count="sysCount" :class-name="'badge_count'">系统消息</Badge></DropdownItem>
                <DropdownItem @click="getToNotification('/notification/chat')"><Badge :count="chatCount" :class-name="'badge_count'">我的消息</Badge></DropdownItem>
            </DropdownMenu>
        </template>
    </Dropdown>
</template>
<script>
    import MyWebSock from "@/utils/socket";

    export default {
        data () {
            return {
            }
        },
        computed: {
            currentUser(){
                return this.$store.state.user.info;
            },
            messageList() {
                return this.$store.state.notification.messageList
            },
            totalCount() {
                return this.$store.state.notification.totalCount
            },
            atCount() {
                return this.$store.state.notification.atCount
            },
            replyCount() {
                return this.$store.state.notification.replyCount
            },
            zanCount() {
                return this.$store.state.notification.zanCount
            },
            sysCount() {
                return this.$store.state.notification.sysCount
            },
            followCount() {
                return this.$store.state.notification.followCount
            },
            chatCount() {
                return this.$store.state.notification.chatCount
            },
        },
        beforeUnmount() {
            if(this.stompClient){
                this.stompClient.disconnect()
            }
        },
        async created() {
            this.stompClient = new MyWebSock();
            await this.getMessage();
        },
        methods:{
            async getMessage(){
                await this.$store.dispatch('notification/getNotificationCount')
            },
            getToNotification(path){
                this.$router.push({
                    path: path,
                });
            }
        },
    }
</script>



<style>
.badge_count{
    background: rgb(241, 64, 60)!important;
    font-size: 11px!important;
    padding: 0 4px!important;
    min-width: 0 !important;
    border: 2px solid rgb(255, 255, 255);
    transform: scale(0.8)!important;
    border-radius: 20px!important;
    right: -10px!important;
    top: -7px!important;
}
</style>