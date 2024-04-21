<template>
    <div style="border-bottom: 1px solid #eeeeee;padding: 15px;margin-bottom: 2px" v-for="item in dataList">{{item.content}}</div>
</template>

<script>
    import {getNotificationByType} from "@/apis/notification";

    export default {
        name: "SystemNotification.vue",
        data(){
            return {
                searchForm:{
                    currentPage: 1,
                    pagSize: 10,
                    type: 'reply'
                },
                dataList: [],
            }
        },
        methods:{
            getPage(){
                getNotificationByType(this.searchForm).then(res=>{
                    if(res.code === 200){
                        this.dataList = res.result;
                    }else {
                        this.$Message.error(res.msg);
                    }
                })
            }
        },
        created() {
            this.getPage()
        }
    }
</script>

<style scoped>

</style>