<template>
    <Content class="layout-content">
        <Row :gutter="16">
            <Col span="18">
                <!-- 主要内容区域 -->
                <div class="main_content">
                    <div class="setting-wrapper">
                        <h3>
                            <Icon type="md-settings"/>
                            设置
                        </h3>
                        <Tabs value="userInfoSettings" :animated="false" size="small">
                            <Spin fix  size="large" :show="loading">
                            </Spin>
                            <TabPane label="基本资料" name="userInfoSettings">
                                <Form ref="userInfoForm" :model="userInfoForm" :rules="userInfoFormRule"
                                      :label-width="80">
                                    <FormItem label="邮箱地址">
                                        <Input type="text" v-model="userInfoForm.email" placeholder="邮箱地址" readonly
                                               disabled></Input>
                                    </FormItem>
                                    <FormItem label="用户标签" prop="userTags">
                                        <Select v-model="userInfoForm.userTags" filterable multiple allow-create :max-tag-count="13" @on-create="selectUserTags">
                                            <Option v-for="item in defaultUserTags" :value="item.value" :key="item.value">{{ item.label }}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="所在地" prop="location">
                                        <City v-model="userInfoForm.location" show-suffix/>
                                    </FormItem>
                                    <FormItem label="性别" prop="gender">
                                        <RadioGroup v-model="userInfoForm.gender">
                                            <Radio label="man">男</Radio>
                                            <Radio label="women">女</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem label="个人网站" prop="website">
                                        <Input type="text" v-model="userInfoForm.website" placeholder="个人网站"></Input>
                                    </FormItem>
                                    <FormItem label="用户昵称" prop="nickname">
                                        <Input type="text" v-model="userInfoForm.nickname" placeholder="昵称"></Input>
                                    </FormItem>
                                    <FormItem label="个人简介" prop="bio">
                                        <Input v-model="userInfoForm.bio" type="textarea" :rows="3" show-word-limit
                                               placeholder="个人简介"/>
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" @click="updateUserInfo" :disabled="updateUserLoading">立即修改</Button>
                                        <Button style="margin-left: 8px" @click="handleReset('userInfoForm')">重置
                                        </Button>
                                    </FormItem>
                                </Form>

                            </TabPane>
                            <TabPane label="通知设置" name="name2">

                            </TabPane>
                            <TabPane label="头像修改" name="name3">
                                <Image width="100px" height="100px" class="ivu-card-bordered ivu-mb-8" :src="userInfoForm.avatar">
                                    <template #error>
                                        <Icon type="ios-image-outline" size="24" color="#ccc" />
                                    </template>
                                </Image>
                                <Upload :action="uploadAvatarUrl" :show-upload-list="false" :on-success="uploadAvatarSuccess" :on-error="uploadAvatarError" :on-progress="updateAvatarProgress" :headers="uploadAvatarHeaders">
                                    <Button icon="ios-cloud-upload-outline" >上传头像</Button>
                                </Upload>
                                <Progress :percent="uploadPercent" v-if="uploadPercent > 0 && uploadPercent !==100" />
                            </TabPane>
                            <TabPane label="密码重置" name="name4">

                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Col>
            <Col span="6">
                <div class="right_content">
                    <UserInfoNav></UserInfoNav>
                    <!-- 广告区域-->
                    <AdvertNav class="ivu-mt-8"></AdvertNav>
                </div>
            </Col>
        </Row>
    </Content>
</template>

<script>
    import UserInfoNav from "@/layouts/UserInfoNav";
    import AdvertNav from "@/layouts/AdvertNav";
    import {userInfo, userUpdateInfo, userUpdateInit} from "@/apis/user";
    import store from "@/store";
    import {getToken} from "@/utils/token";

    export default {
        name: "Settings.vue",
        components: {
            UserInfoNav,
            AdvertNav
        },
        data() {
            return {
                loading: false,
                uploading: false,
                updateUserLoading: false,
                uploadPercent: 0,
                uploadAvatarUrl: process.env.VUE_APP_API +'/api/user/upload/avatar',
                uploadAvatarHeaders: {
                    Authorization: `Bearer ${getToken()}`
                },
                userInfoForm: {
                    userTags: [],
                    gender: '',
                    bio: '',
                    website: '',
                    location: '',
                    nickname: ''
                },
                defaultUserTags: [
                    {
                        value: '后端开发',
                        label: '后端开发'
                    },
                    {
                        value: '前端开发',
                        label: '前端开发'
                    },
                    {
                        value: '全栈开发',
                        label: '全栈开发'
                    },
                    {
                        value: 'Java',
                        label: 'Java'
                    },
                    {
                        value: 'JavaScript',
                        label: 'JavaScript'
                    },
                    {
                        value: '人文艺术',
                        label: '人文艺术'
                    },
                    {
                        value: '历史爱好者',
                        label: '历史爱好者'
                    },
                    {
                        value: '游戏开发',
                        label: '游戏开发'
                    },
                    {
                        value: '影视剧迷',
                        label: '影视剧迷'
                    },
                    {
                        value: '健身运动',
                        label: '健身运动'
                    },
                    {
                        value: '旅行探险',
                        label: '旅行探险'
                    },
                    {
                        value: '音乐制作',
                        label: '音乐制作'
                    },
                    {
                        value: '科幻爱好者',
                        label: '科幻爱好者'
                    },
                    {
                        value: '宠物爱好者',
                        label: '宠物爱好者'
                    },
                    {
                        value: '环保志愿者',
                        label: '环保志愿者'
                    },
                    {
                        value: '社交达人',
                        label: '社交达人'
                    },
                    {
                        value: '心理健康',
                        label: '心理健康'
                    },
                    {
                        value: '创业者',
                        label: '创业者'
                    },
                    {
                        value: '摄影师',
                        label: '摄影师'
                    }
                ],
                userInfoFormRule: []
            }
        }
        , methods: {
            async uploadAvatarSuccess(response, file, fileList) {
                if (response && response.code === 200) {
                    this.$Message.success("上传成功！");
                    this.uploadPercent = 100;
                    this.userInfoForm.avatar = response.result;
                    store.commit('user/setAvatar', response.result);
                } else {
                    this.$Message.error("上传失败！");
                    this.uploadPercent = 0;
                }
            },
            uploadAvatarError(response, file, fileList) {
                this.uploadPercent = 0;
                this.$Message.error("上传失败！msg=" + response);
            },
            updateAvatarProgress(event, file, fileList) {
                this.uploadPercent = Math.floor(event.percent);
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            selectUserTags(val) {
                this.defaultUserTags.push({
                    value: val,
                    label: val
                });
            },
            getUserInfoInit() {
                this.loading = true
                userUpdateInit().then(res => {
                    if(res.code === 200){
                        this.userInfoForm = res.result;
                    }else {
                        this.$Message.error(res.msg);
                    }
                }).finally(()=>{
                    this.loading = false;
                })
            },
            updateUserInfo() {
                this.updateUserLoading = true;
                userUpdateInfo(this.userInfoForm).then(async  res => {

                    if(res.code === 200){
                        this.$Message.success("修改成功！");
                        let response = await userInfo();
                        store.commit('user/setUserInfo', response.result);
                    }else {
                        this.$Message.error(res.msg);
                    }

                }).finally(()=>{
                    this.updateUserLoading = false;
                })
            }
        },
        created() {
            this.getUserInfoInit();
        }
    }
</script>

<style scoped>
    .main_content {
        padding: 20px;
        background: #fff !important;
        border: 1px solid #eee;
    }

    .sep20 {
        height: 20px;
    }

    .layout-content {
        background: #f6f8fa !important;
        width: 1060px;
        margin: 20px auto;
    }
</style>