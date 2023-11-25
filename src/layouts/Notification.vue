<template>
    <a  href="#" style="font-size: 20px;vertical-align: middle"><Icon type="md-notifications-outline" /></a>
</template>

<script>
    import MyWebSock from "@/utils/socket";
    export default {
        name: "Notification",
        computed:{
            currentUser(){
                return this.$store.state.user.user;
            }
        },

    }
</script>

<style scoped>

</style>