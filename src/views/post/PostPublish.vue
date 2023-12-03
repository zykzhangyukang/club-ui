<template>
    <Row :gutter="16">
        <Col span="18">
            <div class="main_content">
                <h3>
                    <Icon type="ios-paper-plane"/>
                    发帖
                </h3>
                <Divider/>
                <Form :model="postForm" label-position="right" :label-width="80">
                    <FormItem label="帖子标题">
                        <Input v-model="postForm.title" placeholder="请输入帖子标题..."></Input>
                    </FormItem>
                    <FormItem label="帖子内容">
                        <QuillEditor ref="quillEditor" theme="snow" :toolbar="toolbar" style="height: 250px"></QuillEditor>
                    </FormItem>
                    <FormItem label="所属板块">
                        <Cascader :data="data" v-model="postForm.sectionId" v-width="200" trigger="hover"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="createPost">立即发布</Button>
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
    import {QuillEditor} from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import {getPostToken, postPublish} from "@/apis/post";


    export default {
        name: "Settings.vue",
        components: {
            UserInfoNav,
            PublishTips,
            QuillEditor
        },
        data() {
            return {
                postForm: {
                    title: '',
                    token: '',
                    content: '',
                    sectionId: [],
                },
                data: [],
                toolbar: [
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],               // custom button values
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                    [{'direction': 'rtl'}],                         // text direction
                    ['link', 'image']
                ]
            }
        }, methods: {
            getSectionList() {
                sectionList().then(res => {
                    this.data = this.transformData(res.result);
                })
            },
            getPostToken() {
                getPostToken().then(res => {
                    this.postForm.token = res.result;
                })
            },
            createPost() {
                if (!this.postForm.title) {
                    return this.$Message.warning("帖子标题不能为空！");
                }
                const text = this.$refs.quillEditor.getText();
                const html = this.$refs.quillEditor.getHTML();
                if (!text || text === '' || text.trim().length ===0) {
                    return this.$Message.warning("帖子内容不能为空！");
                }
                const sectionArr = this.postForm.sectionId;
                if (!sectionArr || sectionArr.length === 0 || sectionArr.length !== 2) {
                    return this.$Message.warning("所属栏目不能为空！");
                }
                const param = {
                    title: this.postForm.title,
                    token: this.postForm.token,
                    content: html,
                    sectionId: sectionArr[1]
                }
                postPublish(param).then(res=>{
                    console.log(res)
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
            this.getPostToken();
        }
    }
</script>
<style>
    .ql-toolbar.ql-snow {
        padding: 2px !important;
        font-family: "Comic Sans MS", serif;
    }
</style>
<style scoped>
    .main_content {
        padding: 20px;
        background: #fff !important;
        border: 1px solid #e4e6eb;
    }
</style>