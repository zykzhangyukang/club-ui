<template>
    <Content class="layout-content">
        <Row :gutter="16">
            <Col span="18">
                <div class="main_content">
                    <Skeleton :loading="loading" animated style="margin-top: 12px" :paragraph="{ rows: 6}">
                        <template #template>
                        </template>
                        <template #default>
                            <Breadcrumb>
                                <BreadcrumbItem to="/">
                                    首页
                                </BreadcrumbItem>
                                <BreadcrumbItem to="/">
                                    {{post.parentSectionName}}
                                </BreadcrumbItem>
                                <BreadcrumbItem to="/">
                                    {{post.sectionName}}
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <h1 id="post_title" v-line-clamp="1">{{post.title}}</h1>
                            <div class="post-details">
                                <div class="author-section">
                                    <div class="author-info">
                                        <div class="author-actions">
                                            <Avatar icon="ios-person" shape="square" :src="post.avatar" class="ivu-mr-16 ivu-tag-border"/>
                                            <Button class="follow-btn" size="small" :type="post.isFollowed? '': 'success'" @click="followUser(post.userId,post.isFollowed)" :loading="followLoading" :disabled="null!=currentUser && currentUser.userId === post.userId">
                                                <Icon type="md-star-outline"/>
                                                {{post.isFollowed ? '取消关注': '关注作者'}}
                                            </Button>
                                            <Button class="message-btn" size="small">
                                                <Icon type="ios-chatboxes-outline"/>
                                                私信
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div class="post-header">
                                    <div class="header-info" v-line-clamp="1">
                                        <span class="ivu-ml-4" style="color: #778087;font-weight:600;cursor: pointer;"> {{post.nickname}}</span> 发布于 {{post.createdAt }}
                                        <Divider type="vertical"/>
                                        阅读量:{{ post.viewsCount }}
                                        <Divider type="vertical"/>
                                        点赞:{{ post.likesCount }}
                                        <Divider type="vertical"/>
                                        收藏:{{ post.favoritesCount }}
                                        <Divider type="vertical"/>
                                        评论:{{ post.commentsCount }}
                                        <Divider type="vertical"/>
                                        <span v-if="post.tags && post.tags.length > 0">标签：
                                        <tag size="small" v-for="item in post.tags">
                                             {{ item }}
                                        </tag>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div id="post_content" v-html="post.content">
                            </div>
                        </template>
                    </Skeleton>
                </div>
            </Col>
            <Col span="6">
                <div class="right_content">
                    <GuideNav></GuideNav>
                    <AdvertNav></AdvertNav>
                </div>
            </Col>
        </Row>
    </Content>
</template>

<script>
    import GuideNav from "@/layouts/GuideNav";
    import AdvertNav from "@/layouts/AdvertNav";
    import {getPostDetail} from "@/apis/post";
    import {userFollow, userUnFollow} from "@/apis/user";

    export default {
        components: {
            GuideNav,
            AdvertNav,
        },
        data() {
            return {
                loading: false,
                followLoading: false,
                post: {}
            }
        },
        computed:{
            currentUser(){
                return this.$store.state.user.user;
            }
        },
        methods: {
            postDetail() {
                let id = this.$route.query.id;
                this.loading = true;
                getPostDetail(id).then(res => {
                    this.post = res.result;
                }).finally(() => {
                    this.loading = false;
                })
            },
            followUser(userId,isFollowed){

                // 如果关注了，则取消关注
                if(isFollowed){
                    this.followLoading = true;
                    userUnFollow(userId).then(res=>{
                        this.$Message.success("取关成功！");
                        this.post.isFollowed = false;
                    }).finally(()=>{
                        this.followLoading = false;
                    })
                }else {
                    this.followLoading = true;
                    userFollow(userId).then(res=>{
                        this.$Message.success("关注成功！");
                        this.post.isFollowed = true;
                    }).finally(()=>{
                        this.followLoading = false;
                    })
                }
            },
        },
        created() {
            this.postDetail();
        }
    }
</script>
<style scoped>
    .main_content {
        padding: 20px;
        background: #fff !important;
        border: 1px solid #e4e6eb;
    }

    .layout-content {
        background: #f6f8fa !important;
        width: 1060px;
        margin: 20px auto;
        min-height: 500px;
    }

    #post_content {
        padding: 10px;
        overflow: auto;
    }


    .post-details {
        padding: 5px;
        margin-top: 5px;
        border: 1px solid #eee;
        background: #f9f9f9;
        border-radius: 2px;
    }

    .post-header {
        margin-top: 5px;
    }

    .post-header h2 {
        font-size: 24px;
        margin-top: 10px;
    }

    .header-info {
        font-size: 12px;
        color: #666;
        margin-bottom: 2px;
    }

    .author-section {
        display: flex;
        align-items: center;
    }

    .author-info {
        display: flex;
        align-items: center;
    }

    .author-actions {
        margin-left: auto;
        margin-bottom: 5px;
    }

    .message-btn,
    .follow-btn {
        margin-right: 10px;
    }


</style>
<style>
    #post_content img {
        max-width: 100%;
        height: auto;
        cursor: pointer;
    }

    #post_content blockquote {
        border-left: 8px solid #d0e5f2;
        padding: 10px 10px;
        margin: 10px 0;
        background-color: #f1f1f1;
    }

    #post_title {
        margin-top: 20px;
        margin-bottom: 2px;
        font-size: 24px;
        color: rgba(0, 0, 0, .85);
        font-weight: 500;
    }
</style>