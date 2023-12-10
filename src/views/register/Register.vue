<template>
    <Content class="layout-content">
    <Row :gutter="16">
        <Col span="18">
            <!-- 主要内容区域 -->
            <div class="main_content">
                <div class="register-wrapper">
                    <h3>注册账号</h3>
                    <Divider/>
                    <Form ref="registerForm" :model="registerForm" :label-width="80">
                        <Alert type="warning" show-icon v-if="tipMsg" :fade="false" :closable="false">{{tipMsg}}</Alert>
                        <FormItem label="用户账号" prop="username">
                            <Input  v-model="registerForm.username"  placeholder="请输入登录账号" maxlength="16" autocomplete="off"></Input>
                        </FormItem>
                        <FormItem label="登录密码" prop="password">
                            <Input type="password" v-model="registerForm.password"  placeholder="请输入登录密码" maxlength="20" autocomplete="off"></Input>
                        </FormItem>
                        <FormItem label="注册邮箱" prop="email">
                            <Input  type="email" v-model="registerForm.email"  placeholder="请输入注册邮箱" maxlength="64" autocomplete="off"></Input>
                        </FormItem>
                        <FormItem label="验证码" prop="code">
                            <Row :gutter="16">
                                <Col span="8">
                                    <div>
                                        <Input v-model="registerForm.code" placeholder="请输入验证码" maxlength="5" autocomplete="off"></Input>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div class="captcha_img">
                                        <Spin fix :show="spinShow"> </Spin>
                                        <img :src="captchaBase64" @click="getRegisterCaptcha">
                                    </div>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('registerForm')">注册</Button>
                            <Button @click="handleReset('registerForm')" style="margin-left: 8px">重置</Button>
                            <p style="margin-top: 10px">
                                已经拥有账户？<a @click="this.$router.push('/login')" :loading="btnLoading">登录</a>
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </Col>
        <Col span="6">
            <div class="right_content">
                <!-- 广告区域-->
                <AdvertNav></AdvertNav>
            </div>
        </Col>
    </Row>
    </Content>
</template>
<script>
    import tool from "@/utils/tool";
    import {registerCaptcha, userRegister} from "@/apis/user";
    import GuideNav from "@/layouts/GuideNav";
    import AdvertNav from "@/layouts/AdvertNav";

    export default {
        components:{
          GuideNav,
          AdvertNav
        },
        data () {
            return {
                registerForm: {
                    username: '',
                    password: '',
                    code: '',
                    email: '',
                    captchaKey: ''
                },
                spinShow: false,
                captchaBase64: '',
                tipMsg: '',
                btnLoading: false,
            }
        },
        methods: {
            handleSubmit () {
                if (!this.registerForm.username || this.registerForm.username === '') {
                    this.tipMsg = "登录账号不能为空！";
                    return;
                }
                if (!this.registerForm.password || this.registerForm.password === '') {
                    this.tipMsg = "登录密码不能为空！";
                    return
                }
                if (!this.registerForm.email || this.registerForm.email === '') {
                    this.tipMsg = "注册邮箱不能为空！";
                    return;
                }
                if (!this.registerForm.code || this.registerForm.code === '') {
                    this.tipMsg = "验证码不能为空！";
                    return;
                }
                this.btnLoading = true;
                userRegister(this.registerForm).then(res => {
                    this.$Message.success('注册成功!');
                    this.$router.push("/login");
                }).catch((e) => {
                    this.registerForm.code = '';
                    this.tipMsg  = e.msg;
                    this.getRegisterCaptcha();
                }).finally(() => {
                    this.btnLoading = false;
                })

            },
            handleReset (name) {
                this.$refs[name].resetFields();
                this.tipMsg = "";
            },
            getRegisterCaptcha() {
                let uuid = tool.uuid();
                this.spinShow = true;
                this.registerForm.captchaKey = uuid;
                registerCaptcha(uuid).then(res => {
                    this.captchaBase64 = res.result;
                }).finally(() => {
                    this.spinShow = false;
                })
            },
        },
        created() {
            this.getRegisterCaptcha();
        }
    }
</script>
<style scoped>
    .captcha_img {
        width: 105px;
        height: 35px;
        vertical-align: middle;
        cursor: pointer;
        display: inline-block;
        position: relative;
        border: 1px solid #eee;
    }
    .main_content {
        padding: 20px;
        background: #fff !important;
        border: 1px solid #eee;
    }
    .layout-content {
        background: #f6f8fa !important;
        width: 1060px;
        margin: 20px auto;
    }
</style>