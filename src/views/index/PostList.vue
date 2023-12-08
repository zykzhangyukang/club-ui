<template>
    <div class="list_wrapper">
        <Skeleton :loading="loading" animated avatar style="margin-top: 12px">
            <template #template>
            </template>
            <template #default>
                <div  v-if="postList && postList.length > 0">
                    <List :loading="loading" :border="false">
                        <ListItem v-for="item in postList" :key="item.postId">
                            <ListItemMeta>
                                <template v-slot:title>
                                    <a class="post_title" v-line-clamp="1" @click="getPostDetail(item.postId)">  {{item.title}}</a>
                                </template>
                                <template v-slot:avatar>
                                    <Avatar  :src="item.avatar" size="35"  />
                                </template>
                                <template v-slot:description>
                                    <span class="section_name">{{item.sectionName}} </span> •  <span class="nickname">{{item.nickname}}</span> • <span style="font-size: 12px;color: #778087">{{item.createdAtStr}}</span>
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
                    <Page :total="total" :page-size="searchForm.pageSize" :model-value="searchForm.currentPage" class-name="page_bar" size="default" @on-change="pageChange" />
                </div>
                <div v-else>
<!--                    <img class="empty_svg" :src="require('@/assets/img/empty.svg')"/>-->
                    <img class="empty_svg" src="https://ioss-bucket.oss-cn-shenzhen.aliyuncs.com/club/cdn/imgs/empty.svg"/>
                    <div class="ivu-text-center ivu-mb-16 " style="color: #808695;font-size: 11px;">暂无更多内容了~</div>
                </div>
            </template>
        </Skeleton>
    </div>
</template>
<script>
    import {getPostPage} from "@/apis/post";
    import tool from "@/utils/tool";
    import EventBus from '@/utils/eventBus';

    export default {
        data() {
            return {
                searchForm: {
                    currentPage: 1,
                    pageSize: 20,
                    firstSectionId: null,
                    secondSectionId: null,
                },
                postList: [],
                loading: false,
                total: 0,
            }
        },
        methods: {
            getPage() {
                this.loading = true;
                getPostPage(this.searchForm).then(res => {
                    this.postList = res.result.dataList;
                    this.total= res.result.totalRow;
                    this.postList.forEach(item=>{
                        item.createdAtStr = tool.showTime(item.createdAt);
                    })
                }).finally(() => {
                    this.loading = false;
                })
            },
            pageChange(page){
                this.searchForm.currentPage = page;
                this.getPage();
                document.body.scrollTop = 0; // 兼容旧版本浏览器
                document.documentElement.scrollTop = 0; // 兼容现代浏览器
            },
            getPostDetail(postId){
                this.$router.push({
                    path: '/post/detail',
                    query: { id: postId }
                });
            }
        },
        mounted() {
            const eventBus = EventBus.config.globalProperties.$eventBus;
            eventBus.$on('sectionChange', (firstSection, secondSection) => {
                this.searchForm.firstSectionId = firstSection;
                this.searchForm.secondSectionId = secondSection;
                this.searchForm.currentPage = 1;
                this.getPage();
            });
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
    .nickname{
        font-weight: 600;
        font-size: 12px;
        color: #778087;
        cursor: pointer;
    }
    .nickname:hover{
        text-decoration: underline;
    }
    .empty_svg{
        width: 150px;
        height: 150px;
        display: block;
        text-align: center;
        margin: 20px auto;
        user-select: none;
        -webkit-user-drag: none;
    }
    .page_bar{
        display: inline-block;
        margin: 10px auto;
        font-size: 12px;
    }
    .post_title{
    }
</style>