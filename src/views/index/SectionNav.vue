<template>
    <div class="section_nav_wrapper">
        <div class="first_level_section">
            <a v-for="item in sectionList" :key="item.sectionId"
               :class="[item === activeFirstSection ? 'first_level_item current_active': 'first_level_item']"
               @click="selectFirstSection(item)">{{item.sectionName}}</a>
        </div>
        <div class="second_level_section">
            <a v-for="subItem in activeFirstSectionChildren" :key="subItem.sectionId"
               :class="[subItem.sectionName === activeNameSecond ? 'second_level_item current_active': 'second_level_item']"
               @click="selectSecondSection(subItem.sectionName)">{{subItem.sectionName}}</a>
        </div>
    </div>
</template>

<script>
    import { sectionList } from "@/apis";

    export default {
        name: "CatalogNav.vue",
        data() {
            return {
                sectionList: [],
                activeFirstSection: null,
                activeNameSecond: '全部',
                activeFirstSectionChildren: []
            }
        },
        methods: {
            getSectionList() {
                sectionList().then(res => {
                    this.sectionList = res.result;
                    if (this.sectionList.length > 0) {
                        this.activeFirstSection = this.sectionList[0]; // Set the first section as active on initialization
                        this.activeFirstSectionChildren = this.activeFirstSection.children || [];
                    }
                }).finally(() => {
                });
            },
            selectFirstSection(item) {
                this.activeFirstSection = item;
                this.activeFirstSectionChildren = item.children || [];
                this.activeNameSecond = '全部';
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
        height: 40px;
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
        background-color: #334;
        color: #fff;
        transition: all 200ms;
    }

    .second_level_section > .current_active {
        text-decoration: underline;
        color: #334;
    }
</style>