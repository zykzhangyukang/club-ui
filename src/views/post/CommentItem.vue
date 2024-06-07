<template>
    <div class="comment-item">
        <div class="comment-header">
            <Avatar :src="comment.avatar" />
            <div class="user-info">
                <span class="username">{{ comment.nickname }}</span>
                <span class="timestamp">{{ formatTime(comment.createTime) }}</span>
                <span class="location">{{ comment.location }}</span>
            </div>
        </div>
        <div class="comment-content">
            <span v-html="formatContent(comment.content)"></span>
        </div>
        <div class="comment-actions">
            <label type="text" @click="likeComment">
                <Icon type="md-thumbs-up" /> 点赞({{ comment.likes }})
            </label>
            <label type="text" @click="toggleReplyInput">
                <Icon type="md-text" /> 回复
            </label>
            <label type="text">
                <Icon type="md-warning" /> 举报
            </label>
            <label type="text" @click="deleteComment" v-if="currentUser==null || currentUser.userId === comment.userId">
                <Icon type="md-trash" /> 删除
            </label>
        </div>
        <div v-if="comment.showReply" class="reply-input">
            <EmojiInput ref="replyInput" v-model="replyContent" placeholder="写下你的回复..."  class="emoji_input"   maxlength="512" show-word-limit />
            <Button type="primary" @click="submitReply(comment)">回复</Button>
        </div>
        <div class="reply-list" v-if="comment.replies.length">
            <div v-for="(reply, index) in comment.replies" :key="index" class="reply-item">
                <div class="reply-header">
                    <Avatar :src="reply.avatar" />
                    <div class="user-info">
                        <span class="username">{{ reply.nickname }}</span>
                        <span class="timestamp">{{ formatTime(reply.createTime)}}</span>
                        <span class="location"> {{ reply.location }}</span>
                    </div>
                </div>
                <div class="reply-content">
                    <span v-if="reply.replyId > 0"> 回复 <a> @{{reply.toUserNickName}} : </a></span>  <span v-html="formatContent(reply.content )"></span>
                </div>
                <div class="reply-actions">
                    <label type="text" @click="likeReply(reply)">
                        <Icon type="md-thumbs-up" /> 点赞({{ reply.likes }})
                    </label>
                    <label type="text" @click="toggleReplyInputForReply(reply, index)">
                        <Icon type="md-text" /> 回复
                    </label>
                    <label type="text">
                        <Icon type="md-warning" /> 举报
                    </label>
                    <label type="text" @click="deleteReply(index)" v-if="currentUser==null || currentUser.userId === reply.userId">
                        <Icon type="md-trash" /> 删除
                    </label>
                </div>
                <div v-if="reply.showReplyInput" class="reply-input">
                    <EmojiInput :ref="'replyInput-'+index" v-model="reply.replyContent" :placeholder="reply.placeholder" class="emoji_input" maxlength="512" show-word-limit />
                    <Button type="primary" @click="submitReplyForReply(reply)" :loading="loading">回复</Button>
                </div>
            </div>
            <div class="load-more-replies" v-if="isShowMore && isShow" @click="loadMoreReplies">
                <span>共{{comment.replyCount}}条回复，点击查看<Icon type="ios-arrow-down" /> </span>
            </div>
        </div>
    </div>
</template>

<script>
    import tool from "@/utils/tool";
    import { postComment, postReplyPage } from "@/apis/post";
    import EmojiInput from "@/components/emoji/EmojiInput";
    import {parseEmotions} from '@/components/emoji/emojiParser'

    export default {
        name: "CommentItem",
        components: {EmojiInput},
        props: {
            comment: Object
        },
        data() {
            return {
                replyContent: "",
                isShow: true,
                loading: false
            };
        },
        computed: {
            currentUser() {
                return this.$store.state.user.info;
            },
            isShowMore() {
                return this.loadedReplies < this.comment.replyCount;
            },
            loadedReplies(){
                return this.comment.replies.length;
            }
        },
        methods: {
            loadMoreReplies() {
                let isLogin = this.$store.state.user.isLogin;
                if (!isLogin) {
                    return this.$Message.warning('用户未登录！');
                }
                const lastReplyId = this.comment.replies[this.comment.replies.length - 1].commentId;
                let param = {
                    offsetId: lastReplyId,
                    pageSize: 5,
                    commentId: this.comment.commentId
                }
                postReplyPage(param).then(res => {
                    if (res.code === 200) {
                        const newReplies = res.result;

                        if(!newReplies || newReplies.length === 0){
                            this.$Message.warning("没有更多了！");
                            this.isShow = false;
                        }else {
                            this.comment.replies.push(...newReplies);
                        }
                        this.loadedReplies += newReplies.length;
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
            },
            formatTime(time) {
                return tool.showTime(time);
            },
            formatContent(content) {
                return parseEmotions(content);
            },
            likeComment() {
                this.comment.likes += 1;
            },
            toggleReplyInput() {
                let isLogin = this.$store.state.user.isLogin;
                if (!isLogin) {
                    return this.$Message.warning('用户未登录！');
                }
                if (!this.comment.showReply) {
                    this.$emit('closeAllInput');
                }
                this.comment.showReply = !this.comment.showReply;
                this.$nextTick(() => {
                    if (this.comment.showReply) {
                        this.$refs.replyInput.focusInput();
                    }
                });
            },
            submitReply(comment) {
                let isLogin = this.$store.state.user.isLogin;
                if (!isLogin) {
                    return this.$Message.warning('用户未登录！');
                }
                if(!this.replyContent){
                    return this.$Message.warning("内容不能为空！");
                }
                if (this.replyContent.trim() !== "") {
                    let param = {
                        postId: comment.postId,
                        parentId: comment.commentId,
                        content: this.replyContent,
                    }
                    this.loading = true;
                    postComment(param).then(res => {
                        if (res.code === 200) {
                            this.$emit('reply', res.result);
                            this.replyContent = "";
                            this.comment.showReply = false;
                            this.isShow = false;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).finally(e=>{
                        this.loading = false;
                    })
                }
            },
            likeReply(reply) {
                reply.likes += 1;
            },
            toggleReplyInputForReply(reply, index) {
                let isLogin = this.$store.state.user.isLogin;
                if (!isLogin) {
                    return this.$Message.warning('用户未登录！');
                }
                if (!reply.showReplyInput) {
                    this.$emit('closeAllInput');
                }
                reply.showReplyInput = !reply.showReplyInput;
                reply.placeholder = `回复 @${reply.nickname} : `;
                this.$nextTick(() => {
                    if (reply.showReplyInput) {
                        this.$refs[`replyInput-${index}`][0].focusInput();
                    }
                });
            },
            submitReplyForReply(reply) {
                let isLogin = this.$store.state.user.isLogin;
                if (!isLogin) {
                    return this.$Message.warning('用户未登录！');
                }
                if(!reply.replyContent){
                    return this.$Message.warning("内容不能为空！");
                }
                if (reply.replyContent.trim() !== "") {
                    let param = {
                        postId: reply.postId,
                        parentId: this.comment.commentId,
                        replyId: reply.commentId,
                        content: reply.replyContent,
                    }
                    this.loading = true;
                    postComment(param).then(res => {
                        if (res.code === 200) {
                            res.result.content = `回复 @${reply.nickname} : ${res.result.content}`;
                            this.$emit('reply', res.result);
                            reply.replyContent = "";
                            reply.showReplyInput = false;
                            this.isShow = false;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).finally(e=>{
                        this.loading = false;
                    })
                }
            },
            deleteComment() {
                this.$Modal.confirm({
                    title: '删除评论',
                    content: '<p>您是否要删除该条评论？</p>',
                    onOk: () => {
                        this.$emit('deleteComment');
                    },
                });
            },
            deleteReply(replyIndex) {
                this.$Modal.confirm({
                    title: '删除回复',
                    content: '<p>您是否要删除该条回复？</p>',
                    onOk: () => {
                        this.$emit('deleteReply', replyIndex);
                    },
                });
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
        margin-left: 35px;
        /*border-left: 2px solid #eee;*/
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
        user-select: none;
    }
    .reply-actions label{
        cursor: pointer;
    }
    .comment-actions label{
        cursor: pointer;
    }
    .load-more-replies {
        user-select: none;
        text-align: left;
        cursor: pointer;
        color: #9499A0;
        margin-top: 8px;
        font-size: 12px;
    }
    .emoji_input{
        width: 90%;
        margin-right: 8px;
    }
    #emoji{
        width: 20px!important;
        height: 20px!important;
    }
</style>
