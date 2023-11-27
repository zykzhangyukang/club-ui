<template>
    <Badge  :count="noReadCount">
       消息
    </Badge>
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
                return this.$store.state.user.user;
            },
            messageList() {
                return this.$store.state.notification.messageList
            },
            noReadCount() {
                return this.$store.state.notification.noRead
            }
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
                await this.$store.dispatch('notification/getMessage')
            }
        },
    }
</script>



<style >
    .ivu-badge-count {
        font-family: "Monospaced Number",serif;
        line-height: 15px!important;
        vertical-align: middle;
        position: absolute;
        transform: translateX(50%);
        top: -10px;
        right: 0;
        height: 16px!important;
        border-radius: 10px!important;
        min-width: 20px;
        background: #ed4014;
        border: 1px solid transparent;
        color: #fff;
        text-align: center;
        padding: 0 0 !important;
        font-size: 9px !important;
        white-space: nowrap;
        transform-origin: -10% center;
        z-index: 10;
        box-shadow: 0 0 0 1px #fff;
    }
</style>