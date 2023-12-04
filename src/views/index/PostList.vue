<template>
    <div class="list_wrapper">
        <Skeleton :loading="loading" animated avatar>
            <template #template>
            </template>
            <template #default>
                <List :loading="loading" :border="false">
                    <ListItem v-for="item in postList" :key="item.postId">
                        <ListItemMeta :avatar="item.avatar" :title="item.title" description="超大特大城市名单有了新变化!住房和城乡建设部日前发布。"/>
                        <template #action>
                            <li>
                                <Icon type="ios-star-outline"/>
                                1
                            </li>
                            <li>
                                <Icon type="ios-thumbs-up-outline"/>
                                23
                            </li>
                            <li>
                                <Icon type="ios-chatbubbles-outline"/>
                                57
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
</style>