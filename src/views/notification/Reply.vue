<template>
    <div>
        <Card v-for="(item,index) in dataList" :key="item.id" class="notification-card" dis-hover>
            <div class="notification-header">
                <Avatar :src="item.senderAvatar" size="large"/>
                <div class="notification-content">
                    <span class="notification-time">{{ formatTime(item.createTime) }} </span>
                    <span v-if="item.type === 'comment_post'">
                            <strong>{{item.sendNickName}}</strong> <span style="color: #505050"> 对我的帖子发表了评论 </span>
                             <br/>
                            <span class="content">{{item.comment ?  item.comment.content : "该评论已被删除！"}}</span>
                        </span>
                    <span v-if="item.type === 'reply_comment'">
                        <strong>{{item.sendNickName}}</strong> <span style="color: #505050"> 回复了我的评论</span>
                        <br/>
                        <span class="content">{{item.comment ? item.comment.content : "该评论已被删除！"}}</span>
                        <blockquote>{{item.comment ? item.comment.repliedContent : "该回复已被删除！"}}</blockquote>
                    </span>
                    <span v-if="item.type === 'reply_at_comment'">
                          <strong>{{item.sendNickName}}</strong><span style="color: #505050"> 回复了我的评论</span>
                           <br/>
                            <span class="content">回复 <a>@{{item.nickname}}</a> {{item.comment ? item.comment.content : "该评论已被删除！"}}</span>
                            <blockquote>{{item.comment ? item.comment.repliedContent : "该回复已被删除！"}}</blockquote>
                    </span>
                </div>
                <Badge dot :count="item.isRead ? 0 : 1">
                    <Button size="small" @click="markAsRead(item)" v-if="!item.isRead" class="mark-read-btn">标记为已读
                    </Button>
                    <Button size="small" @click="remove(item,index)" v-else class="remove-btn">清除该消息</Button>
                </Badge>
            </div>
        </Card>
        <Page
                v-if="this.total > 0"
                :total="total"
                :current="searchForm.currentPage"
                :page-size="searchForm.pageSize"
                @on-change="changePage"
        />
    </div>
</template>

<script>
    import {deleteNotification, getNotificationByType, markNotificationAsRead} from "@/apis/notification";
    import tool from "@/utils/tool";
    import store from "@/store";

    export default {
        name: "SystemNotification",
        data() {
            return {
                searchForm: {
                    currentPage: 1,
                    pageSize: 7,
                    type: 'reply'
                },
                dataList: [],
                total: 0
            };
        },
        methods: {
            formatTime(time) {
                return tool.showTime(time);
            },
            getPage() {
                getNotificationByType(this.searchForm).then(res => {
                    if (res.code === 200) {
                        this.dataList = res.result.dataList;
                        this.total = res.result.totalRow;
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            },
            changePage(page) {
                this.searchForm.currentPage = page;
                this.getPage();
            },
            markAsRead(item) {
                markNotificationAsRead(item.notificationId).then(res => {
                    if (res.code === 200) {
                        item.isRead = true;
                        this.$Message.success('标记成功');
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            },
            remove(item, index) {
                deleteNotification(item.notificationId).then(res => {
                    if (res.code === 200) {
                        this.dataList.splice(index, 1);
                        this.total -= 1;
                        this.$Message.success('清除成功');
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
            }
        },
        created() {
            this.getPage();
        }
    };
</script>

<style scoped>
    .notification-card {
        margin-bottom: 5px;
        font-size: 13px;
    }

    .notification-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .notification-content {
        flex-grow: 1;
        margin-left: 10px;
    }

    .notification-time {
        color: #888;
        margin-right: 5px;
    }

    .mark-read-btn {
        margin-left: 10px;
    }

    .remove-btn {
        margin-left: 10px;
    }

    blockquote {
        padding: 5px 0 0 .6em;
        border-left: 2px solid hsla(0, 0%, 39.2%, .2);
        font-size: 12px;
        color: #999;
    }

    .content {
        display: inline-block;
        margin: 5px;
        color: #222;
    }
</style>
