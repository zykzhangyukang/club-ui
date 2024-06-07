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
                <Form :model="postForm" label-position="right" :label-width="80" :rules="ruleValidate">
                    <FormItem label="帖子标题" prop="title">
                        <Input v-model="postForm.title" placeholder="请输入帖子标题..."></Input>
                    </FormItem>
                    <FormItem label="帖子内容" prop="content">
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
                    <FormItem label="添加标签" prop="tags">
                        <Select v-model="postForm.tags" filterable multiple allow-create :max-tag-count="6" @on-create="selectPostTags" placeholder="按回车键Enter创建标签">
                            <template #prefix>
                                <Icon type="ios-pricetags-outline" />
                            </template>
                            <Option v-for="item in defaultUserTags" :value="item.value"
                                    :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="所属板块" prop="sectionId">
                        <Cascader :data="selectList" v-model="postForm.sectionId" v-width="200" trigger="hover"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="createPost" :loading="loading">立即发布</Button>
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
    import {onBeforeUnmount, onMounted, reactive, ref, shallowRef} from 'vue'
    import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
    import {Message} from 'view-ui-plus'
    import {useRouter} from 'vue-router'
    import {useStore} from "vuex";
    import {getToken} from "@/utils/token";


    export default {
        name: "Settings.vue",
        components: {
            UserInfoNav,
            PublishTips,
            Editor,
            Toolbar
        },
        setup() {
            const defaultUserTags =    [
                {
                    value: '后端开发',
                    label: '后端开发'
                },
                {
                    value: '前端开发',
                    label: '前端开发'
                }
            ];
            const store = useStore();
            const router = useRouter();
            // 编辑器实例，必须用 shallowRef
            const editorRef = shallowRef()
            // 栏目数据
            const selectList = ref([]);
            const loading = ref(false);
            // 表单数据
            const postForm = reactive({
                title: '',
                token: '',
                content: '',
                sectionId: null,
                tags: [],
            })
            // 规则校验
            const ruleValidate =reactive({
                title: [
                    { required: true, message: '标题不能为空！', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '内容不能为空！', trigger: 'blur' }
                ],
                sectionId: [
                    { required: true, message: '栏目不能为空！', trigger: 'blur' }
                ],
            })

            const toolbarConfig = {
                excludeKeys: [
                    'insertTable', 'deleteTable',
                    'insertTableRow', 'deleteTableRow', 'insertTableCol', 'deleteTableCol',
                    'insertVideo', 'uploadVideo', 'editVideoSize','codeBlock'
                ]
            }
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
                            Authorization: `Bearer ${getToken()}`
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
                let list = store.state.index.sectionList;
                if(list){
                    selectList.value = transformData(list);
                }
            }

            function initPostToken() {
                getPostToken().then(res => {
                    postForm.token = res.result;
                })
            }

            function createPost() {
                if (!postForm.title) {
                    return Message.warning("标题不能为空！");
                }
                if (!postForm.content) {
                    return Message.warning("内容不能为空！");
                }
                const sectionArr = postForm.sectionId;
                if (!sectionArr || sectionArr.length === 0 || sectionArr.length !== 2) {
                    return Message.warning("栏目不能为空！");
                }
                const param = {
                    title: postForm.title,
                    token: postForm.token,
                    content: postForm.content,
                    sectionId: sectionArr[1],
                    tags: postForm.tags
                }
                loading.value = true;
                postPublish(param).then(res => {
                    if(res.code === 200){
                        Message.success("创建成功！");
                        router.push('/')
                    }else {
                        Message.warning(res.msg);
                    }

                }).finally(()=>{
                    loading.value = false;
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

            function selectPostTags(val) {
                defaultUserTags.push({
                    value: val,
                    label: val
                });
            }

            return {
                editorRef,
                selectList,
                postForm,
                loading,
                mode: 'simple',
                toolbarConfig,
                editorConfig,
                ruleValidate,
                handleCreated,
                defaultUserTags,
                createPost,
                selectPostTags
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
