<template>
    <div class="comment-section ivu-mt-8">
        <div style="padding: 20px;
                      border-radius: 4px;">
            <div class="comment-input">
                <Avatar  icon="md-person" :src="currentUser.avatar" />
                <Input v-model="newComment" placeholder="写下你的评论..." class="ivu-mr-8 ivu-ml-8" />
                <Button type="primary" @click="addComment">评论</Button>
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

    export default {
        name: "PostComment",
        components: {
            CommentItem
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
                    postComment(param).then(res => {
                        if (res.code === 200) {
                            this.comments.unshift(res.result);
                            this.newComment = "";
                        } else {
                            this.$Message.error(res.msg);
                        }
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
                        this.$Message.success("删除成功！")
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
                        this.$Message.success("删除成功！")
                    }else {
                        this.$Message.error(res.msg);
                    }
                })
            }
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
</style>
