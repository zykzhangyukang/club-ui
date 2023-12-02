<template>
    <div class="section_nav_wrapper">
        <div class="first_level_section">
            <a :class="['全部' === activeNameFirst ? 'first_level_item current_active': 'first_level_item']"
               @click="selectFirstSection('全部')">全部</a>
            <a :class="[item.sectionName === activeNameFirst ? 'first_level_item current_active': 'first_level_item']"
               v-for="item in sectionList" @click="selectFirstSection(item.sectionName)">{{item.sectionName}}</a>
        </div>
        <div class="second_level_section">
            <a :class="['全部' === activeNameSecond ? 'second_level_item current_active': 'second_level_item']"
               @click="selectSecondSection('全部')">全部</a>
            <a class="second_level_item"
               :class="['程序员' === activeNameSecond ? 'second_level_item current_active': 'second_level_item']"
               @click="selectSecondSection('程序员')">程序员</a>
            <a class="second_level_item"
               :class="['Python' === activeNameSecond ? 'second_level_item current_active': 'second_level_item']"
               @click="selectSecondSection('Python')">Python</a>
            <a class="second_level_item"
               :class="['Java' === activeNameSecond ? 'second_level_item current_active': 'second_level_item']"
               @click="selectSecondSection('Java')">Java</a>
            <a class="second_level_item"
               :class="['Android' === activeNameSecond ? 'second_level_item current_active': 'second_level_item']"
               @click="selectSecondSection('Android')">Android</a>
            <a class="second_level_item"
               :class="['运维' === activeNameSecond ? 'second_level_item current_active': 'second_level_item']"
               @click="selectSecondSection('运维')">运维</a>
            <a class="second_level_item"
               :class="['大数据' === activeNameSecond ? 'second_level_item current_active': 'second_level_item']"
               @click="selectSecondSection('大数据')">大数据</a>
        </div>
    </div>
</template>

<script>
    import {sectionList} from "@/apis";

    export default {
        name: "CatalogNav.vue",
        data() {
            return {
                sectionList: [],
                activeNameFirst: '全部',
                activeNameSecond: '全部',
            }
        },
        methods: {
            getSectionList() {
                sectionList().then(res => {
                    this.sectionList = res.result;
                }).finally(() => {
                })
            },
            selectFirstSection(item) {
                this.activeNameFirst = item;
            },
            selectSecondSection(item) {
                this.activeNameSecond = item;
            }
        },
        mounted() {
            this.getSectionList();
        }
    }
</script>

<style scoped>
    .section_nav_wrapper {
        height: 86px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, .1);
    }

    .first_level_section {
        height: 44px;
        background: #ffffff;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        text-align: left;
        padding: 10px;
        font-size: 14px;
        line-height: 150%;
    }

    .second_level_section {
        height: 42px;
        background: #f9f9f9;
        padding: 10px 10px 10px 20px;
        font-size: 14px;
        line-height: 150%;
        text-align: left;
    }

    .second_level_section > .second_level_item {
        margin-right: 20px;
        color: #778087;
        font-size: 13px;
    }

    .first_level_section > .first_level_item {
        display: inline-block;
        font-size: 14px;
        line-height: 14px;
        padding: 5px 8px;
        margin-right: 5px;
        border-radius: 3px;
        color: #555;
        -webkit-tap-highlight-color: transparent;
    }

    .first_level_section > .current_active {
        display: inline-block;
        font-size: 14px;
        line-height: 14px;
        padding: 5px 8px;
        margin-right: 5px;
        border-radius: 3px;
        background-color: #00b96b;
        color: #fff;
        transition: all 200ms;
    }

    .second_level_section > .current_active {
        text-decoration: underline;
        color: #515a6e;
    }
</style>