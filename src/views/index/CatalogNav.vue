<template>
    <RadioGroup :size="'small'" type="button" style="margin-bottom: 10px;">
        <Radio label="1">技术</Radio>
        <Radio label="2">创意</Radio>
        <Radio label="3">好玩</Radio>
        <Radio label="4">Apple</Radio>
        <Radio label="5">前端开发</Radio>
        <Radio label="6">后端架构</Radio>
        <Radio label="7">机器学习</Radio>
        <Radio label="8">生活</Radio>
        <Radio label="9">城市</Radio>
        <Radio label="10">技术</Radio>
        <Radio label="11">游戏</Radio>
        <Radio label="12">职场</Radio>
    </RadioGroup>

    <tag color="blue" style="cursor: pointer;margin-bottom: 10px">程序员</tag>
    <tag style="cursor: pointer;margin-bottom: 10px">iDev</tag>
    <tag style="cursor: pointer;margin-bottom: 10px">Android</tag>
    <tag style="cursor: pointer;margin-bottom: 10px">Linux</tag>
    <tag style="cursor: pointer;margin-bottom: 10px">node.js</tag>
    <tag style="cursor: pointer;margin-bottom: 10px">云计算</tag>
    <tag style="cursor: pointer;margin-bottom: 10px">宽带症候群</tag>
    <Divider/>

</template>

<script>
    export default {
        name: "CatalogNav.vue"
    }
</script>

<style scoped>
    .ivu-tabs-bar {
        border-bottom: 1px solid #dcdee2;
        margin-bottom: 0 !important;
    }
    .ivu-tabs{
        height: 38px;
    }
    .ivu-divider-horizontal {
        margin: 0 0!important;
    }
</style>