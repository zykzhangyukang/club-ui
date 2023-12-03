<template>
    <Row :gutter="16">
        <Col span="18">
            <div class="main_content">
                <h3><Icon type="ios-paper-plane" />发帖</h3>
                <Divider/>
                <Form  :model="postForm" label-position="right" :label-width="80">
                    <FormItem label="帖子标题">
                        <Input v-model="postForm.title" placeholder="请输入帖子标题..."></Input>
                    </FormItem>
                    <FormItem label="帖子内容">
                        <Input v-model="postForm.content" type="textarea" :rows="8" placeholder="请输入帖子内容..."></Input>
                    </FormItem>
                    <FormItem label="所属板块">
                        <Cascader :data="data" v-model="postForm.sectionId"  v-width="200" trigger="hover" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary">立即发布</Button>
                        <Button class="ivu-ml-8">保存草稿</Button>
                    </FormItem>
                </Form>
            </div>
        </Col>
        <Col span="6">
            <div class="right_content">
                <PublishTips></PublishTips>
            </div>
        </Col>
    </Row>
</template>

<script>
    import UserInfoNav from "@/layouts/UserInfoNav";
    import PublishTips from '@/views/post/PublishTips'
    import {sectionList} from "@/apis";

    export default {
        name: "Settings.vue",
        components:{
            UserInfoNav,
            PublishTips,
        },
        data(){
            return {
                postForm:{
                    title: '',
                    content: '',
                    sectionId: null,
                },
                data: []
            }
        },methods:{
            getSectionList(){
                sectionList().then(res=>{
                    this.data = this.transformData(res.result);
                })
            },
            transformData(res) {
                const transformedData = [];
                res.forEach(section => {
                    const newSection = {
                        value: section.sectionId,
                        label: section.sectionName,
                        children: []
                    };
                    if (section.children && section.children.length > 0) {
                        section.children.forEach(child => {
                            const newChild = {
                                value: child.sectionId,
                                label: child.sectionName
                            };
                            newSection.children.push(newChild);
                        });
                    }
                    transformedData.push(newSection);
                });
                return transformedData;
            },
        },
        created() {
            this.getSectionList();
        }
    }
</script>

<style scoped>
    .main_content {
        padding: 20px;
        background: #fff !important;
        border: 1px solid #e4e6eb;
    }
</style>