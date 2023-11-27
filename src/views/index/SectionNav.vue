<template>
    <RadioGroup class="catalog_wrapper" :size="'small'" type="button">
        <Radio :label="section.sectionName" v-for="section in sectionList" :key="section.sectionName">{{section.sectionName}}</Radio>
    </RadioGroup>
    <br/>

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
    import {sectionList} from "@/apis";

    export default {
        name: "CatalogNav.vue",
        data() {
            return {
                sectionList: [],
            }
        },
        methods: {
            getSectionList() {
                sectionList().then(res => {
                    this.sectionList = res.result;
                }).finally(()=>{
                })
            }
        },
        mounted() {
            this.getSectionList();
        }
    }
</script>

<style scoped>

    .ivu-divider-horizontal {
        margin: 0 0 !important;
    }

    .catalog_wrapper {
        display: inline-block;
        position: relative;
        margin-bottom: 10px;
        height: 24px;
        width: 100%;
    }
</style>