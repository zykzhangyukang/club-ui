<template>
    <Content class="layout-content">
        <Row :gutter="16">
            <Col span="18">
                <div class="main_content">
                    <Spin :show="loading" fix size=large >
                    </Spin>
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
                                    <Button v-if="post.isFollowed" class="follow-btn" size="small"  @click="followUser(post.userId,post.isFollowed)" :disabled="(null!=currentUser && currentUser.userId === post.userId) || followLoading">
                                      取消关注
                                    </Button>
                                    <Button v-else class="follow-btn" size="small"  type="success" @click="followUser(post.userId,post.isFollowed)" :disabled="(null!=currentUser && currentUser.userId === post.userId) || followLoading">
                                      立即关注
                                    </Button>
                                    <Button class="message-btn" size="small">
                                        <Icon type="ios-chatboxes-outline"/>
                                        私信
                                    </Button>
                                    <Button class="edit-btn" size="small" @click="toEditPostPage(post.postId)"
                                            v-if="currentUser && post.userId === currentUser.userId">
                                        编辑
                                    </Button>
                                    <Button class="edit-btn" type="small"  @click="likePost(post.postId,post.isLiked)" style="color: #666" :disabled="likeLoading">
                                        <Icon   :type="post.isLiked ? 'md-thumbs-up' :'ios-thumbs-up-outline' " style="color: #f40;font-size: 13px;vertical-align: text-bottom" /> 点赞数:{{ post.likesCount }}
                                    </Button>
                                    <Button class="edit-btn" type="small" @click="collectPost(post.postId,post.isCollected)" style="cursor: pointer" >
                                        <Icon  :type="post.isCollected ? 'ios-heart' :'ios-heart-outline' " style="color: orange;font-size: 13px;" /> 收藏:{{ post.collectsCount }}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div class="post-header">
                            <div class="header-info" v-line-clamp="1">
                                <span class="ivu-ml-4" style="color: #778087;font-weight:600;cursor: pointer;"> {{post.nickname}}</span>
                                发布于 {{post.createdAt }}
                                <Divider type="vertical"/>
                                <label style="cursor: pointer" >
                                    阅读量:{{ post.viewsCount }}
                                </label>
                                  <span style="user-select: none">
                                    <Divider type="vertical"/>
                                    评论:{{ post.commentsCount }}
                                    <Divider type="vertical"/>
                                    <span v-if="post.tags && post.tags.length > 0">标签：
                                            <tag size="small" v-for="item in post.tags">
                                                 {{ item }}
                                            </tag>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div id="post_content" v-html="post.content">
                    </div>
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
    import {getPostDetail, postCollect, postLike, postUnCollect, postUnLike} from "@/apis/post";
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
                likeLoading: false,
                collectLoading: false,
                post: {}
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.user.info;
            }
        },
        methods: {
            toEditPostPage(postId) {
                this.$router.push('/post/edit?id=' + postId);
            },
            postDetail() {
                let id = this.$route.query.id;
                this.loading = true;
                getPostDetail(id).then(res => {
                    if (res.code === 200) {
                        this.post = res.result;
                    } else {
                        this.$router.push('/404');
                    }

                }).finally(() => {
                    this.loading = false;
                })
            },
            followUser(userId, isFollowed) {
                let isLogin = this.$store.state.user.isLogin;
                if (!isLogin) {
                    return this.$Message.warning('用户未登录！');
                }
                // 如果关注了，则取消关注
                if (isFollowed) {
                    this.followLoading = true;
                    userUnFollow(userId).then(res => {
                        if(res.code === 200){
                            // this.$Message.success("取关成功！");
                            this.post.isFollowed = false;
                        }else {
                            this.$Message.error(res.msg);
                        }
                    }).finally(() => {
                        this.followLoading = false;
                    })
                } else {
                    this.followLoading = true;
                    userFollow(userId).then(res => {
                        if(res.code === 200){
                            // this.$Message.success("关注成功！");
                            this.post.isFollowed = true;
                        }else {
                            this.$Message.error(res.msg);
                        }
                    }).finally(() => {
                        this.followLoading = false;
                    })
                }
            },
            likePost(userId, isLiked) {
                let isLogin = this.$store.state.user.isLogin;
                if (!isLogin) {
                    return this.$Message.warning('用户未登录！');
                }
                // 如果点赞了，则取消点赞
                if (isLiked) {
                    this.likeLoading = true;
                    postUnLike(userId).then(res => {
                        if (res.code === 200) {
                            // this.$Message.success("已取消点赞！");
                            this.post.isLiked = false;
                            this.post.likesCount = this.post.likesCount -1;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).finally(() => {
                        this.likeLoading = false;
                    })
                } else {
                    this.likeLoading = true;
                    postLike(userId).then(res => {
                        if (res.code === 200) {
                            // this.$Message.success("点赞成功！");
                            this.post.isLiked = true;
                            this.post.likesCount = this.post.likesCount  + 1;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).finally(() => {
                        this.likeLoading = false;
                    })
                }
            },
            collectPost(userId, isCollected) {
                let isLogin = this.$store.state.user.isLogin;
                if (!isLogin) {
                    return this.$Message.warning('用户未登录！');
                }
                // 如果点赞了，则取消点赞
                if (isCollected) {
                    this.collectLoading = true;
                    postUnCollect(userId).then(res => {
                        if (res.code === 200) {
                            this.post.isCollected = false;
                            this.post.collectsCount = this.post.collectsCount -1;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).finally(() => {
                        this.collectLoading = false;
                    })
                } else {
                    this.collectLoading = true;
                    postCollect(userId).then(res => {
                        if (res.code === 200) {
                            this.post.isCollected = true;
                            this.post.collectsCount = this.post.collectsCount  + 1;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).finally(() => {
                        this.collectLoading = false;
                    })
                }
            }
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

    .edit-btn,
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
    .main_content{
        min-height: 240px;
    }
</style>