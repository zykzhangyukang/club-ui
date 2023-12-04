<template>
    <Content class="layout-content">
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
                        <div style="border: 1px solid #e4e6eb">
                            <Toolbar
                                    style="border-bottom: 1px solid #e4e6eb"
                                    :editor="editorRef"
                                    :defaultConfig="toolbarConfig"
                                    :mode="mode"
                            />
                            <Editor
                                    style="height: 300px; overflow-y: hidden;"
                                    v-model="postForm.content"
                                    :defaultConfig="editorConfig"
                                    :mode="mode"
                                    @onCreated="handleCreated"
                            />
                        </div>
                    </FormItem>
                    <FormItem label="所属板块">
                        <Cascader :data="selectList" v-model="postForm.sectionId" v-width="200" trigger="hover"/>
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
    </Content>
</template>

<script>
    import UserInfoNav from "@/layouts/UserInfoNav";
    import PublishTips from '@/views/post/PublishTips'
    import {sectionList} from "@/apis";
    import {getPostToken, postPublish} from "@/apis/post";
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import {onBeforeUnmount, ref, shallowRef, onMounted, reactive} from 'vue'
    import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
    import {Message} from 'view-ui-plus'
    import {useRouter} from 'vue-router'


    export default {
        name: "Settings.vue",
        components: {
            UserInfoNav,
            PublishTips,
            Editor,
            Toolbar
        },
        setup() {
            const router = useRouter();
            // 编辑器实例，必须用 shallowRef
            const editorRef = shallowRef()
            // 栏目数据
            const selectList = ref([]);
            // 表单数据
            const postForm = reactive({
                title: '',
                token: '',
                content: '',
                sectionId: [],
            })

            const toolbarConfig = {}
            const editorConfig = {
                placeholder: '请输入内容...',
                MENU_CONF: {
                    uploadImage: {
                        server: process.env.VUE_APP_API + '/api/post/upload/image',
                        allowedFileTypes: ['image/*'],
                        fieldName: 'file',
                        maxNumberOfFiles: 1,
                        maxFileSize: 1024 * 1024,
                        headers: {
                            Authorization: localStorage.getItem('token') || ''
                        },
                        onSuccess(file, res) {
                            Message.success("上传图片成功！");
                        },
                        onError(file, err, res) {
                            Message.warning("上传图片错误！"+ err)
                        },
                        onFailed(file, res) {
                            Message.warning("上传图片失败！")
                        },
                        customInsert(res , insertFn) {
                            insertFn(res.result, '', '')
                        },
                    },
                    codeSelectLang: {
                        codeLangs: [
                            { text: 'CSS', value: 'css' },
                            { text: 'HTML', value: 'html' },
                            { text: 'XML', value: 'xml' },
                        ]
                    }
                }
            }

            // 组件销毁时，也及时销毁编辑器
            onBeforeUnmount(() => {
                const editor = editorRef.value
                if (editor == null) return
                editor.destroy()
            })

            onMounted(() => {
                initPostToken();
                initSectionList();
            })

            const handleCreated = (editor) => {
                editorRef.value = editor // 记录 editor 实例，重要！
            }

            function initSectionList() {
                sectionList().then(res => {
                    selectList.value = transformData(res.result);
                })
            }

            function initPostToken() {
                getPostToken().then(res => {
                    postForm.token = res.result;
                })
            }

            function createPost() {
                if (!postForm.title) {
                    return Message.warning("帖子标题不能为空！");
                }
                if (!postForm.content) {
                    return Message.warning("帖子内容不能为空！");
                }
                const sectionArr = postForm.sectionId;
                if (!sectionArr || sectionArr.length === 0 || sectionArr.length !== 2) {
                    return Message.warning("所属栏目不能为空！");
                }
                const param = {
                    title: postForm.title,
                    token: postForm.token,
                    content: postForm.content,
                    sectionId: sectionArr[1]
                }
                postPublish(param).then(res => {
                    Message.success("创建帖子成功！");
                    router.push('/')
                })
            }

            function transformData(res) {
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
            }

            return {
                editorRef,
                selectList,
                postForm,
                mode: 'simple',
                toolbarConfig,
                editorConfig,
                handleCreated,
                createPost
            };
        },
    }
</script>
<style scoped>
    .main_content {
        padding: 20px;
        background: #fff !important;
        border: 1px solid #e4e6eb;
    }

    .w-e-full-screen-container {
        z-index: 1000 !important;
    }
    .layout-content {
        background: #f6f8fa !important;
        width: 1060px;
        margin: 20px auto;
    }
</style>