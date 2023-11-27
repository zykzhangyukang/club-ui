<template>
    <Row :gutter="16">
        <Col span="18">
            <!-- 主要内容区域 -->
            <div class="main_content">
                <div class="setting-wrapper">
                    <h3><Icon type="md-settings" />  设置</h3>
                    <Tabs value="userInfoSettings" :animated="false" size="small">
                        <TabPane label="基本资料" name="userInfoSettings">
                            <Form ref="userInfoForm" :model="userInfoForm" :rules="userInfoFormRule" :label-width="80">
                                <FormItem label="邮箱地址">
                                    <Input type="text" v-model="userInfoForm.email" placeholder="邮箱地址" readonly disabled></Input>
                                </FormItem>
                                <FormItem label="用户标签" prop="userTags">
                                    <Select v-model="userInfoForm.userTags" filterable multiple allow-create @on-create="selectUserTags" >
                                        <Option v-for="item in defaultUserTags" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="所在地" prop="location">
                                    <City v-model="userInfoForm.location" show-suffix />
                                </FormItem>
                                <FormItem label="性别" prop="gender">
                                    <RadioGroup v-model="userInfoForm.gender">
                                        <Radio label="man" >男</Radio>
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
                                    <Input v-model="userInfoForm.bio" type="textarea" :rows="3" show-word-limit  placeholder="个人简介" />
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="updateUserInfo">修改</Button>
                                    <Button  style="margin-left: 8px" @click="handleReset('userInfoForm')" >重置</Button>
                                </FormItem>
                            </Form>
                            
                        </TabPane>
                        <TabPane label="通知设置" name="name2">标签二的内容</TabPane>
                        <TabPane label="头像修改" name="name3">标签三的内容</TabPane>
                        <TabPane label="密码重置" name="name4">标签三的内容</TabPane>
                    </Tabs>
                </div>
            </div>
        </Col>
        <Col span="6">
            <div class="right_content">
                <UserInfoNav></UserInfoNav>
            </div>
        </Col>
    </Row>
</template>

<script>
    import UserInfoNav from "@/layouts/UserInfoNav";
    import {userUpdateInfo, userUpdateInit} from "@/apis/user";
    export default {
        name: "Settings.vue",
        components:{
          UserInfoNav
        },
        data(){
            return {
                userInfoForm:{
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
                ],
                userInfoFormRule:[

                ]
            }
        }
        ,methods:{
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            selectUserTags (val) {
                this.defaultUserTags.push({
                    value: val,
                    label: val
                });
            },
            getUserInfoInit(){
                userUpdateInit().then(res=>{
                    this.userInfoForm = res.result;
                })
            },
            updateUserInfo(){
                userUpdateInfo(this.userInfoForm).then(res=>{
                    this.$Message.success("修改信息成功！");
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
</style>