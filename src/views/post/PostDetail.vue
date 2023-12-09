<template>
    <Content class="layout-content">
        <Row :gutter="16">
            <Col span="18">
                <div class="main_content">
                    <Breadcrumb>
                        <BreadcrumbItem to="/">
                            <Icon type="ios-home-outline"></Icon> 首页
                        </BreadcrumbItem>
                        <BreadcrumbItem to="/components/breadcrumb">
                            程序员
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h2 id="post_title"  v-line-clamp="1">{{post.title}}</h2>
                    <div class="ivu-mb-16 post_data_nav" v-line-clamp="1">
                        <Icon type="ios-time" /> 于 {{post.createdAt}} 发布
                        <Divider type="vertical" />
                        <Icon  type="md-eye" style="font-size: 14px" />阅读量 {{post.viewsCount}}
                        <Divider type="vertical" />
                        <Icon type="md-thumbs-up" />点赞 {{post.likesCount}}
                        <Divider type="vertical" />
                        <Icon type="md-star" style="font-size: 16px" />收藏 {{post.favoritesCount}}
                        <Divider type="vertical" />
                        <Icon type="md-text" /> 评论 {{post.commentsCount}}
                        <Divider type="vertical" />
                        <tag size="small" v-for="item in post.tags"><Icon type="ios-pricetags-outline" />{{item}}</tag>
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
    import {getPostDetail} from "@/apis/post";
    import tool from "@/utils/tool";
    export default {
        components:{
            GuideNav,
            AdvertNav
        },
        data(){
          return {
              post:{}
          }
        },
        methods:{
            postDetail(){
                let id = this.$route.query.id;
                console.log(id)
                getPostDetail(id).then(res=>{
                    this.post = res.result;
                })
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
    #post_content{
        /*background: #f6f8fa;*/
        padding: 10px;
        overflow: auto;
    }
    .post_data_nav{
        font-size: 11px;
        cursor: pointer;
        padding: 2px;
        color: #515a6e;
        background: #f8f8f8;
    }
</style>
<style>
    #post_content img{
        max-width: 100%;
        height: auto;
        cursor: pointer;
    }
    #post_content blockquote{
        border-left: 8px solid #d0e5f2;
        padding: 10px 10px;
        margin: 10px 0;
        background-color: #f1f1f1;
    }
    #post_title{
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 24px;
        font-weight: 500;
        color: rgba(0,0,0,.85);
    }
</style>