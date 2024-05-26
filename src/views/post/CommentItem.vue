<template>
    <div class="comment-item">
        <div class="comment-header">
            <Avatar :src="comment.avatar" />
            <div class="user-info">
                <span class="username">{{ comment.nickname }}</span>
                <span class="timestamp">{{ comment.createTime }}</span>
                <span class="location">{{ comment.location }}</span>
            </div>
        </div>
        <div class="comment-content">
            <span>{{ comment.content }}</span>
        </div>
        <div class="comment-actions">
            <label type="text" @click="likeComment">
                <Icon type="md-thumbs-up" /> 点赞({{ comment.likes }})
            </label>
            <label type="text" @click="toggleReplyInput">
                <Icon type="md-text" /> 回复
            </label>
        </div>
        <div v-if="showReply" class="reply-input">
            <Input v-model="replyContent" placeholder="写下你的回复..." />
            <Button type="primary" @click="submitReply(comment)">回复</Button>
        </div>
        <div class="reply-list" v-if="comment.replies.length">
            <div v-for="(reply, index) in comment.replies" :key="index" class="reply-item">
                <div class="reply-header">
                    <Avatar :src="reply.avatar" />
                    <div class="user-info">
                        <span class="username">{{ reply.nickname }}</span>
                        <span class="timestamp">{{ reply.createTime}}</span>
                        <span class="location"> {{ reply.location }}</span>
                    </div>
                </div>
                <div class="reply-content">
                    <span> {{ reply.content }}</span>
                </div>
                <div class="reply-actions">
                    <label type="text" @click="likeReply(reply)">
                        <Icon type="md-thumbs-up" /> 点赞({{ reply.likes }})
                    </label>
                    <label type="text" @click="toggleReplyInputForReply(reply)">
                        <Icon type="md-text" /> 回复
                    </label>
                </div>
                <div v-if="reply.showReplyInput" class="reply-input">
                    <Input v-model="reply.replyContent" placeholder="写下你的回复..." />
                    <Button type="primary" @click="submitReplyForReply(reply)">回复</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import tool from "@/utils/tool";
    import {postComment} from "@/apis/post";

    export default {
        name: "CommentItem",
        props: {
            comment: Object
        },
        data() {
            return {
                showReply: false,
                replyContent: ""
            };
        },
        filters:{
          formatTime(time){
              return tool.showTime(time);
          }
        },
        methods: {
            likeComment() {
                this.comment.likes += 1;
            },
            toggleReplyInput() {
                this.showReply = !this.showReply;
            },
            submitReply(comment) {
                if (this.replyContent.trim() !== "") {
                    let param = {
                        postId: comment.postId,
                        parentId: comment.commentId,
                        content: this.replyContent,
                    }
                    postComment(param).then(res => {
                        if (res.code === 200) {
                            this.$emit('reply', res.result);
                            this.replyContent = "";
                            this.showReply = false;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    })
                }
            },
            likeReply(reply) {
                reply.likes += 1;
            },
            toggleReplyInputForReply(reply) {
                reply.showReplyInput = !reply.showReplyInput;
            },
            submitReplyForReply(reply) {
                if (reply.replyContent.trim() !== "") {
                    let param = {
                        postId: reply.postId,
                        parentId: this.comment.commentId,
                        replyId: reply.commentId,
                        content: reply.replyContent,
                    }
                    postComment(param).then(res => {
                        if (res.code === 200) {
                            this.$emit('reply', res.result);
                            reply.replyContent = "";
                            reply.showReplyInput = false;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .comment-item {
        border-bottom: 1px solid #eee;
        padding-bottom: 8px;
        margin-bottom: 8px;
    }
    .comment-header {
        display: flex;
        align-items: center;
    }
    .user-info {
        margin-left: 8px;
    }
    .username {
        font-weight: bold;
        margin-right: 8px;
    }
    .timestamp {
        color: #999;
        margin-right: 8px;
    }
    .location {
        color: #999;
        font-size: 11px;
    }
    .comment-content {
        margin-top: 8px;
    }
    .comment-actions {
        display: flex;
        gap: 8px;
        margin-top: 8px;
        cursor: pointer;
        user-select: none;
    }
    .reply-input {
        display: flex;
        margin-top: 8px;
    }
    .reply-input Input {
        flex: 1;
        margin-right: 8px;
    }
    .reply-list {
        margin-top: 8px;
        padding-left: 16px;
        border-left: 2px solid #eee;
    }
    .reply-item {
        margin-bottom: 8px;
    }
    .reply-header {
        display: flex;
        align-items: center;
    }
    .reply-content {
        margin-top: 8px;
    }
    .reply-actions {
        display: flex;
        gap: 8px;
        margin-top: 8px;
    }
</style>
