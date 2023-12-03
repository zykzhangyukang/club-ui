<template>
    <div class="publish_tip_wrapper">
        <h3><Badge color="orange" text=" 发帖提示" /></h3>
        <Divider></Divider>
        <h4>1. 帖子标题</h4>
        <p>请在标题中描述内容要点。如果一件事情在标题的长度内就已经可以说清楚，那就没有必要写正文了。</p>
        <h4>2. 帖子内容 </h4>
        <p>可以在正文中为你要发布的主题添加更多细节。 在正式提交之前，你可以点击本页面上的的“预览主题”来查看 Markdown 正文的实际渲染效果。</p>
        <h4>3. 所属板块 </h4>
        <p>请为你的主题选择一个节点。恰当的归类会让你发布的信息更加有用。
        你可以在主题发布后 5 分钟内，对标题或者正文进行编辑。同时，在 5 分钟内，你可以移动主题到其他节点。</p>
    </div>
</template>
<style scoped>
    .publish_tip_wrapper{
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #e4e6eb;
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 24px;
        padding: 20px;
    }
    .ivu-divider-horizontal{
        margin: 10px 0!important;
    }
    p{
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 11px;
    }
    h4{
        text-decoration: underline;
    }
</style>