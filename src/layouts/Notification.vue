<template>
    <span style="font-size: 12px;margin-top: 5px;display: inline-block">  0 条未读提醒  </span>
</template>

<script>
    import MyWebSock from "@/utils/socket";
    export default {
        name: "Notification",
        data(){
            return {
                stompClient: null,
            }
        },
        computed:{
            currentUser(){
                return this.$store.state.user.user;
            }
        },
        created() {
            this.stompClient = new MyWebSock();
        },
        beforeUnmount() {
            if(this.stompClient){
                this.stompClient.disconnect()
            }
        }
    }
</script>

<style scoped>

</style>