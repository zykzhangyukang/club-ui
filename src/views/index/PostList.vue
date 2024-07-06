<template>
    <BackTop :bottom="100"></BackTop>
    <div class="list_wrapper">
        <Skeleton :loading="loading" animated avatar>
            <template #template>
                <List :border="false">
                    <ListItem v-for="item in 4" :key="item">
                        <ListItemMeta>
                            <template v-slot:title>
                                <a class="post_title" v-line-clamp="1"><SkeletonItem block width="80%" height="16px" /></a>
                            </template>
                            <template v-slot:avatar>
                                <SkeletonItem type="circle" class="ivu-mr" />
                            </template>
                            <template v-slot:description>
                                <span class="section_name"><SkeletonItem width="44px" height="16px" /></span>
                                <span class="nickname"><SkeletonItem width="60px" height="16px" /></span>
                                <span class="timestamp"><SkeletonItem width="60px" height="16px" /></span>
                            </template>
                        </ListItemMeta>
                        <template #action>
                            <li><SkeletonItem width="23px" height="16px" /></li>
                            <li><SkeletonItem width="23px" height="16px" /></li>
                            <li><SkeletonItem width="23px" height="16px" /></li>
                        </template>
                    </ListItem>
                </List>
            </template>
            <template #default>
                <div v-if="postList.length">
                    <List :loading="loading" :border="false">
                        <ListItem v-for="item in postList" :key="item.postId">
                            <ListItemMeta>
                                <template v-slot:title>
                                    <a class="post_title" v-line-clamp="1" @click="getPostDetail(item.postId)">{{ item.title }}</a>
                                </template>
                                <template v-slot:avatar>
                                    <Avatar :src="item.avatar" size="35" />
                                </template>
                                <template v-slot:description>
                                    <span class="section_name">{{ item.sectionName }}</span>
                                    •
                                    <span class="nickname">{{ item.nickname }}</span>
                                    •
                                    <span class="timestamp">{{ item.createdAtStr }}</span>
                                    <span v-if="item.isHot">
                                    •
                                    <span class="hot_tag" >热</span>
                                    </span>
                                </template>
                            </ListItemMeta>
                            <template #action>
                                <li><Icon type="ios-star-outline" />{{ item.collectsCount }}</li>
                                <li><Icon type="ios-thumbs-up-outline" />{{ item.likesCount }}</li>
                                <li><Icon type="ios-chatbubbles-outline" />{{ item.commentsCount }}</li>
                            </template>
                        </ListItem>
                    </List>
                    <Page
                            :total="total"
                            :page-size="searchForm.pageSize"
                            :model-value="searchForm.currentPage"
                            class-name="page_bar"
                            size="default"
                            @on-change="pageChange"
                    />
                </div>
                <div class="empty_wrapper" v-show="isEmpty">
                    <img class="empty_svg" src="https://ioss-bucket.oss-cn-shenzhen.aliyuncs.com/club/cdn/imgs/empty.svg" />
                    <div class="empty_text">暂无更多内容了！</div>
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
        components:{
        },
        data() {
            return {
                searchForm: {
                    currentPage: 1,
                    pageSize: 50,
                    firstSectionId: null,
                    secondSectionId: null
                },
                isEmpty: false,
                postList: [],
                loading: false,
                total: 0
            };
        },
        methods: {
            async getPage() {
                this.loading = true;
                try {
                    const res = await getPostPage(this.searchForm);
                    this.postList = res.result.dataList;
                    this.total = res.result.totalRow;
                    this.postList.forEach(item => {
                        item.createdAtStr = tool.showTime(item.createdAt);
                    });
                    this.isEmpty = this.total === 0;
                } finally {
                    this.loading = false;
                }
            },
            pageChange(page) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
                this.searchForm.currentPage = page;
                this.getPage();
            },
            getPostDetail(postId) {
                this.$router.push({ path: '/post/detail', query: { id: postId } });
            }
        },
        mounted() {
          window.scrollTo(0, 0);
            const eventBus = EventBus.config.globalProperties.$eventBus;
            eventBus.$on('sectionChange', (firstSection, secondSection) => {
                this.searchForm.firstSectionId = firstSection;
                this.searchForm.secondSectionId = secondSection;
                this.searchForm.currentPage = 1;
                this.getPage();
            });
        },
        beforeUnmount() {
            const eventBus = EventBus.config.globalProperties.$eventBus;
            eventBus.$off('sectionChange');
        }
    };
</script>

<style scoped>
    .list_wrapper {
        background: #ffffff;
        padding: 0 10px;
        border: 1px solid #eee;
        border-top: none;
    }

    .section_name,
    .nickname,
    .timestamp {
        font-size: 12px;
    }

    .section_name {
        background: #f5f5f5;
        padding: 0 4px;
        display: inline-block;
        border-radius: 2px;
        color: #999;
    }

    .nickname {
        font-weight: 600;
        color: #778087;
        cursor: pointer;
    }
    .nickname:hover {
        text-decoration: underline;
    }
    .empty_wrapper{
      width: 100%;
      height: 100%;
      text-align: center;
      padding-bottom: 20px;
    }
    .empty_svg {
        width: 250px;
        height: 180px;
        user-select: none;
        -webkit-user-drag: none;
    }
    .empty_text {
      color: #808695;
      font-size: 11px;
    }

    .page_bar {
        display: inline-block;
        margin: 10px auto;
        font-size: 12px;
    }

    .post_title {
        cursor: pointer;
    }
    .hot_tag{
        display: inline-block;
        height: 17px;
        line-height: 17px;
        margin: 0px 4px 2px 0;
        padding: 0 3px;
        border: 1px solid #e8eaec;
        border-radius: 3px;
        font-size: 11px;
        vertical-align: middle;
        opacity: 0.8;
        overflow: hidden;
        background: #f90;
        color: #ffffff;
        cursor: pointer;
    }
</style>
