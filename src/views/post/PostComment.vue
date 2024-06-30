<template>
    <div class="comment-section ivu-mt-8">
        <div style="padding: 10px;  border-radius: 4px;">
            <div class="comment-input">
                <Avatar icon="md-person" :src="currentUser.avatar" />
                <EmojiInput v-model="newComment" style="width: 90%" class="ivu-ml-4 ivu-mr-8" placeholder="这里是评论区，不是无人区;-)"></EmojiInput>
                <Button type="primary" @click="addComment" :loading="loading">评论</Button>
            </div>
          <div v-if="comments.length === 0">
            <img class="empty_svg" src="https://ioss-bucket.oss-cn-shenzhen.aliyuncs.com/club/cdn/imgs/empty.svg" />
            <div class="empty_text">暂无更多评论，快来抢沙发吧！</div>
          </div>
            <div class="comment-list">
                <CommentItem
                        v-for="(comment, index) in comments"
                        :key="index"
                        :comment="comment"
                        @reply="addReply(index, $event)"
                        @closeAllInput="closeAllInput($event)"
                        @deleteComment="deleteComment(index)"
                        @deleteReply="deleteReply(index, $event)"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import CommentItem from './CommentItem.vue';
    import {postComment, postCommentDelete} from "@/apis/post";
    import EmojiInput from "@/components/emoji/EmojiInput";

    export default {
        name: "PostComment",
        components: {
            CommentItem,
            EmojiInput
        },
        props: {
            postId: Number,
            comments: Array
        },
        computed: {
            currentUser() {
                return this.$store.state.user.info;
            },
        },
        data() {
            return {
                newComment: "",
                loading: false
            };
        },
        methods: {
            addComment() {
                let isLogin = this.$store.state.user.isLogin;
                if (!isLogin) {
                    return this.$Message.warning('用户未登录！');
                }
                if(!this.newComment){
                    return this.$Message.warning("内容不能为空！");
                }
                if (this.newComment.trim() !== "") {
                    let param = {
                        postId: this.postId,
                        parentId: 0,
                        content: this.newComment,
                    }
                    this.loading = true;
                    postComment(param).then(res => {
                        if (res.code === 200) {
                            this.comments.unshift(res.result);
                            this.newComment = "";
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).finally(e=>{
                        this.loading = false;
                    })
                }
            },
            addReply(commentIndex, reply) {
                this.comments[commentIndex].replies.push(reply);
            },
            closeAllInput(){
                this.comments.forEach(e=>{
                    e.showReply = false;
                    if(e.replies){
                        e.replies.forEach(i=>{
                            i.showReplyInput = false;
                        })
                    }
                })
            },
            deleteComment(index) {
                const commentId = this.comments[index].commentId;
                postCommentDelete(commentId).then(res=>{
                    if(res.code === 200){
                        this.comments.splice(index, 1);
                    }else {
                        this.$Message.error(res.msg);
                    }
                })
            },
            deleteReply(commentIndex, replyIndex) {
                const replyId = this.comments[commentIndex].replies[replyIndex].commentId;
                postCommentDelete(replyId).then(res=>{
                    if(res.code === 200){
                        this.comments[commentIndex].replies.splice(replyIndex, 1);
                    }else {
                        this.$Message.error(res.msg);
                    }
                })
            }
        },
        mounted() {
        }
    };
</script>

<style scoped>
    .comment-section {
        margin-top: 8px;
    }
    .comment-input {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
    }
    .comment-input Input {
        flex: 1;
        margin: 0 8px;
    }
    .comment-list {
        margin-top: 16px;
    }
    .empty_svg {
      width: 150px;
      height: 150px;
      display: block;
      margin: 0 auto;
      user-select: none;
      -webkit-user-drag: none;
    }
    .empty_text {
      text-align: center;
      margin-bottom: 16px;
      color: #808695;
      font-size: 11px;
    }
</style>
