<template>
    <Tabs :animated="false" size="small">
        <TabPane label="技术"></TabPane>
        <TabPane label="创意"></TabPane>
        <TabPane label="好玩"></TabPane>
        <TabPane label="Apple"></TabPane>
        <TabPane label="前端开发"></TabPane>
        <TabPane label="后端架构"></TabPane>
        <TabPane label="机器学习"></TabPane>
        <TabPane label="生活"></TabPane>
        <TabPane label="城市"></TabPane>
        <TabPane label="游戏"></TabPane>
        <TabPane label="Geek"></TabPane>
        <TabPane label="职场"></TabPane>
    </Tabs>
    <tag color="blue" style="cursor: pointer;margin-bottom: 5px">程序员</tag>
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

<style slot-scope="scope">
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