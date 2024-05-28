<template>
    <Content class="layout-content">
        <Row :gutter="16">
            <Col span="18">
                <div class="main_content">
                    <div class="login-wrapper">
                        <h3>
                            <RadioGroup v-model="loginType">
                                <Radio label="账号登录" border></Radio>
                                <Radio label="扫码登录" border></Radio>
                            </RadioGroup>
                        </h3>
                        <Divider/>
                        <Form ref="loginForm" v-if="loginType==='账号登录'" :model="loginForm" :label-width="80">
                            <Alert type="warning" show-icon v-if="tipMsg" :fade="false" :closable="false">{{tipMsg}}
                            </Alert>
                            <FormItem label="用户名" prop="username">
                                <Input v-model="loginForm.username" placeholder="请输入用户名" maxlength="16"
                                       autocomplete="off"></Input>
                            </FormItem>
                            <FormItem label="密码" prop="password">
                                <Input type="password" v-model="loginForm.password" placeholder="请输入密码" maxlength="20"
                                       autocomplete="off"></Input>
                            </FormItem>
                            <FormItem label="验证码" prop="code">
                                <Row :gutter="16">
                                    <Col span="8">
                                        <div>
                                            <Input v-model="loginForm.code" placeholder="请输入验证码" maxlength="5"
                                                   autocomplete="off"></Input>
                                        </div>
                                    </Col>
                                    <Col span="6">
                                        <div class="captcha_img">
                                            <Spin fix :show="spinShow"></Spin>
                                            <img :src="captchaBase64" @click="getLoginCaptcha">
                                        </div>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('loginForm')" :loading="btnLoading">立即登录
                                </Button>
                                <Button @click="handleReset('loginForm')" style="margin-left: 8px">重置</Button>
                                <p style="margin-top: 10px">
                                    尚未拥有账户？<a @click="this.$router.push('/register')">注册</a>
                                </p>
                            </FormItem>
                        </Form>
                        <div v-if="loginType === '扫码登录'" style="text-align: center;position: relative">
                            <Spin fix :show="qrLoading"> </Spin>
                            <h3 style="user-select: none">关注公众号，输入验证码 <span style="color: #f40">{{eventCode}}</span>
                                <small><a @click="refreshEventCode" type="text"> &nbsp;刷新</a></small>
                            </h3>

                            <img src="https://ioss-bucket.oss-cn-shenzhen.aliyuncs.com/club/cdn/imgs/qrcode.jpg"/>
                            <h3 >
                                <small v-if="eventMsg" style="color: orange">({{eventMsg}})</small>
                            </h3>
                        </div>
                    </div>
                </div>
            </Col>
            <Col span="6">
                <div class="right_content">
                    <AdvertNav></AdvertNav>
                </div>
            </Col>
        </Row>
    </Content>
</template>

<script>
    import { loginCaptcha, userInfo, userLogin } from "@/apis/user";
    import tool from "@/utils/tool";
    import GuideNav from "@/layouts/GuideNav";
    import AdvertNav from "@/layouts/AdvertNav";
    import { getEventCode, subEventCode } from "@/apis/wechat";

    export default {
        components: {
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
                qrLoading: false,
                captchaBase64: '',
                loginType: '账号登录',
                deviceId: tool.uuid(),
                eventCode: "",
                eventMsg: "",
            }
        },
        watch: {
            loginType(newVal) {
                if (newVal === '扫码登录') {
                    this.qrLoading = true;
                    getEventCode(this.deviceId).then(res => {
                        this.eventCode = res.result;
                        this.startSSE(this.deviceId);
                    }).finally(e => {
                        this.qrLoading = false;
                    })
                } else {
                    this.stopSSE();
                }
            },
        },
        beforeUnmount() {
            this.stopSSE();
        },
        methods: {
            startSSE(deviceId) {
                this.eventSource = new EventSource('http://localhost:8080/api/wechat/subscribe?deviceId='+deviceId);
                this.eventSource.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.code === 200) {
                        this.$store.commit('user/setUserInfo', data.result);
                        this.$store.commit('user/setUserToken', data.result.token);
                        this.$router.push('/');
                        this.$Message.success('登录成功！');
                        this.stopSSE();
                    } else {
                        this.eventMsg = data.msg;
                        this.stopSSE();
                    }
                };
                this.eventSource.onerror = (error) => {
                    console.error('Error occurred:', error);
                    this.eventMsg = '连接中断，请刷新二维码重试。';
                    this.stopSSE();
                };
            },
            refreshEventCode() {
                this.stopSSE();
                this.qrLoading = true;
                this.eventMsg = '';
                getEventCode(this.deviceId).then(res => {
                    if (res.code === 200) {
                        this.eventCode = res.result;
                        this.startSSE(this.deviceId);
                    } else {
                        this.$Message.error(res.msg);
                    }
                }).finally(e => {
                    this.qrLoading = false;
                })
            },
            stopSSE() {
                if (this.eventSource) {
                    this.eventSource.close();
                    this.eventSource = null;
                }
            },
            handleSubmit() {
                if (!this.loginForm.username || this.loginForm.username === '') {
                    this.tipMsg = "用户名不能为空！";
                    return;
                }
                if (!this.loginForm.password || this.loginForm.password === '') {
                    this.tipMsg = "密码不能为空！";
                    return
                }
                if (!this.loginForm.code || this.loginForm.code === '') {
                    this.tipMsg = "验证码不能为空！";
                    return;
                }
                this.btnLoading = true;
                userLogin(this.loginForm).then(async res => {
                    if (res.code === 200) {
                        this.$store.commit('user/setUserToken', res.result.token);
                        let response = await userInfo();
                        this.$store.commit('user/setUserInfo', response.result);
                        this.$router.push('/');
                        this.$Message.success('登录成功！');
                    } else {
                        this.$Message.warning(res.msg);
                        this.getLoginCaptcha();
                        this.loginForm.code = '';
                        this.loginForm.password = '';
                        this.tipMsg = e.msg;
                    }
                }).finally(() => {
                    this.btnLoading = false;
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
                this.tipMsg = "";
            },
            getLoginCaptcha() {
                let uuid = this.deviceId;
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
