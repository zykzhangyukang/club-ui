<template>
    <div class="section_nav_wrapper" style="position: relative">
        <Spin fix  size="large" :show="loading">
        </Spin>
        <div class="first_level_section">
            <a v-for="item in sectionList" :key="item.sectionId"
               :class="[item.sectionId === activeFirstSection ? 'first_level_item current_active': 'first_level_item']"
               @click="selectFirstSection(item)">{{item.sectionName}}</a>
        </div>
        <div class="second_level_section">
            <a v-for="subItem in activeFirstSectionChildren" :key="subItem.sectionId"
               :class="[subItem.sectionId === activeSecondSection ? 'second_level_item current_active': 'second_level_item']"
               @click="selectSecondSection(subItem)">{{subItem.sectionName}}</a>
        </div>
    </div>
</template>

<script>
    import { sectionList } from "@/apis";
    import EventBus from '@/utils/eventBus';

    export default {
        name: "CatalogNav.vue",
        data() {
            return {
                loading: false,
                sectionList: [],
                activeFirstSection: null,
                activeSecondSection: null,
                activeFirstSectionChildren: []
            }
        },
        methods: {
            getSectionList() {
                this.loading = true;
                sectionList().then(res => {
                    this.sectionList = res.result;
                    if (this.sectionList.length > 0) {
                        this.activeFirstSection = this.sectionList[0].sectionId; // Set the first section as active on initialization
                        this.activeFirstSectionChildren = this.sectionList[0].children || [];
                    }
                    EventBus.config.globalProperties.$eventBus.$emit('sectionChange', this.activeFirstSection, this.activeSecondSection);
                }).finally(() => {
                    this.loading = false;
                });
            },
            selectFirstSection(item) {
                this.activeFirstSection = item.sectionId;
                this.activeFirstSectionChildren = item.children || [];
                this.activeSecondSection = null;
                EventBus.config.globalProperties.$eventBus.$emit('sectionChange', this.activeFirstSection, this.activeSecondSection);
            },
            selectSecondSection(item) {
                this.activeSecondSection = item.sectionId;
                EventBus.config.globalProperties.$eventBus.$emit('sectionChange', this.activeFirstSection, this.activeSecondSection);
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
        box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
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
        user-select: none;
        -webkit-user-drag: none;
    }

    .second_level_section {
        height: 40px;
        background: #f9f9f9;
        padding: 10px 10px 10px 20px;
        font-size: 14px;
        line-height: 150%;
        text-align: left;
        user-select: none;
        -webkit-user-drag: none;
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
        font-weight: bold;
    }
</style>