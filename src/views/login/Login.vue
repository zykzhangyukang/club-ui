<template>
    <Content class="layout-content">
    <Row :gutter="16">
        <Col span="18">
            <!-- 主要内容区域 -->
            <div class="main_content">
                <div class="login-wrapper">
                    <h3>欢迎登录</h3>
                    <Divider/>
                    <Form ref="loginForm" :model="loginForm" :label-width="80">
                        <Alert type="warning" show-icon v-if="tipMsg" :fade="false" :closable="false">{{tipMsg}}</Alert>
                        <FormItem label="用户账号" prop="username">
                            <Input v-model="loginForm.username" placeholder="请输入登录账号" maxlength="16" autocomplete="off"></Input>
                        </FormItem>
                        <FormItem label="登录密码" prop="password">
                            <Input type="password" v-model="loginForm.password" placeholder="请输入登录密码" maxlength="20" autocomplete="off"></Input>
                        </FormItem>
                        <FormItem label="验证码" prop="code">
                            <Row :gutter="16">
                                <Col span="8">
                                    <div>
                                        <Input v-model="loginForm.code" placeholder="请输入验证码" maxlength="5" autocomplete="off"></Input>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div class="captcha_img">
                                        <Spin fix :show="spinShow"> </Spin>
                                        <img :src="captchaBase64" @click="getLoginCaptcha">
                                    </div>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('loginForm')" :loading="btnLoading">立即登录</Button>
                            <Button @click="handleReset('loginForm')" style="margin-left: 8px">重置</Button>
                            <p style="margin-top: 10px">
                                尚未拥有账户？<a @click="this.$router.push('/register')">注册</a>
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
    import {loginCaptcha, userLogin} from "@/apis/user";
    import tool from "@/utils/tool";
    import GuideNav from "@/layouts/GuideNav";
    import AdvertNav from "@/layouts/AdvertNav";

    export default {
        components:{
          GuideNav,
          AdvertNav
        },
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                    captchaKey: '',
                    code: '',
                },
                tipMsg: '',
                btnLoading: false,
                spinShow: false,
                captchaBase64: '',
            }
        },
        methods: {
            handleSubmit() {
                if (!this.loginForm.username || this.loginForm.username === '') {
                    this.tipMsg = "登录账号不能为空！";
                    return;
                }
                if (!this.loginForm.password || this.loginForm.password === '') {
                    this.tipMsg = "登录密码不能为空！";
                    return
                }
                if (!this.loginForm.code || this.loginForm.code === '') {
                    this.tipMsg = "验证码不能为空！";
                    return;
                }
                this.btnLoading = true;
                userLogin(this.loginForm).then(res => {
                    this.$store.commit('user/setToken', res.result.token);
                    this.$store.commit('user/setRefreshToken', res.result.refreshToken);
                    this.$store.commit('user/setUser', res.result);
                    this.$router.push('/');
                    this.$Message.success('登录成功！');
                }).catch((e) => {
                    this.getLoginCaptcha();
                    this.loginForm.code = '';
                    this.loginForm.password = '';
                    this.tipMsg = e.msg;
                }).finally(() => {
                    this.btnLoading = false;
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
                this.tipMsg = "";
            },
            getLoginCaptcha() {
                let uuid = tool.uuid();
                this.spinShow = true;
                this.loginForm.captchaKey = uuid;
                loginCaptcha(uuid).then(res => {
                    this.captchaBase64 = res.result;
                }).catch(e => {
                    this.$Message.error(e.msg);
                }).finally(() => {
                    this.spinShow = false;
                })
            },
        },
        created() {
            this.getLoginCaptcha();
        }
    }
</script>
<style scoped>
    .captcha_img {
        width: 108px;
        height: 36px;
        vertical-align: middle;
        cursor: pointer;
        display: inline-block;
        position: relative;
        border: 1px solid #666;
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