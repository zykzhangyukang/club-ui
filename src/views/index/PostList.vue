<template>
    <div class="list_wrapper">
        <Skeleton :loading="loading" animated avatar style="margin-top: 12px">
            <template #template>
            </template>
            <template #default>
                <List :loading="loading" :border="false">
                    <ListItem v-for="item in postList" :key="item.postId">
                        <ListItemMeta :avatar="item.avatar" :title="item.title" description="超大特大城市名单有了新变化!住房和城乡建设部日前发布。">
                            <template v-slot:avatar>
                                <Avatar  :src="item.avatar" size="35"  />
                            </template>
                            <template v-slot:description>
                                <span class="section_name">{{item.sectionName}} </span> •  <span class="username">{{item.username}}</span> • <span style="font-size: 12px;color: #778087">{{item.createdAtStr}}</span>
                            </template>
                        </ListItemMeta>
                        <template #action>
                            <li>
                                <Icon type="ios-star-outline"/>
                                {{item.favoritesCount}}
                            </li>
                            <li>
                                <Icon type="ios-thumbs-up-outline"/>
                                {{item.likesCount}}
                            </li>
                            <li>
                                <Icon type="ios-chatbubbles-outline"/>
                                {{item.commentsCount}}
                            </li>
                        </template>
                    </ListItem>
                </List>
            </template>
        </Skeleton>
    </div>
</template>
<script>
    import {getPostPage} from "@/apis/post";
    import tool from "@/utils/tool";

    export default {
        data() {
            return {
                searchForm: {
                    currentPage: 1,
                    pageSize: 30
                },
                postList: [],
                loading: false,
            }
        },
        methods: {
            getPage() {
                this.loading = true;
                getPostPage(this.searchForm).then(res => {
                    this.postList = res.result.dataList;
                    this.postList.forEach(item=>{
                        item.createdAtStr = tool.showTime(item.createdAt);
                    })
                }).finally(() => {
                    this.loading = false;
                })
            }
        },
        created() {
            this.getPage();
        }
    }
</script>
<style scoped>
    .list_wrapper {
        background: #ffffff;
        padding: 0 10px 10px 10px;
        border: 1px solid #e4e6eb;
    }
    .section_name{
        background: #f5f5f5;
        font-size: 12px;
        padding: 0 4px;
        display: inline-block;
        border-radius: 2px;
        color: #999;
    }
    .username{
        font-weight: bold;
        font-size: 12px;
        color: #778087;
        cursor: pointer;
    }
    .username:hover{
        text-decoration: underline;
    }
</style>