<template>
    <div>
        <Card v-for="item in dataList" :key="item.id" class="notification-card" dis-hover>
            <div class="notification-header">
                <Avatar :src="item.senderAvatar" />
                <div class="notification-content">
                    <span class="notification-time">{{ item.createTime }}：</span>
                    <span :class="{'read': item.read}">{{ item.content }}</span>
                </div>
                <Button type="text" @click="markAsRead(item)" v-if="!item.read" class="mark-read-btn">标记为已读</Button>
            </div>
        </Card>
        <Page
                :total="total"
                :current="searchForm.currentPage"
                :page-size="searchForm.pageSize"
                @on-change="changePage"
        />
    </div>
</template>

<script>
    import { getNotificationByType } from "@/apis/notification";

    export default {
        name: "SystemNotification",
        data() {
            return {
                searchForm: {
                    currentPage: 1,
                    pageSize: 10,
                    type: 'system'
                },
                dataList: [],
                total: 0
            };
        },
        methods: {
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
                // markNotificationAsRead(item.id).then(res => {
                //     if (res.code === 200) {
                //         item.read = true;
                //         Message.success('标记成功');
                //     } else {
                //         Message.error(res.msg);
                //     }
                // });
            }
        },
        created() {
            this.getPage();
        }
    };
</script>

<style scoped>
    .notification-card {
        margin-bottom: 10px;
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
    .read {
        color: #bbb;
    }
    .mark-read-btn {
        margin-left: 10px;
    }
</style>
