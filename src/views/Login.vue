<template>
    <div class="demo-login">
        <h3>欢迎登录</h3>
        <Divider/>
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
            <FormItem label="用户账号" prop="username">
                <Input  v-model="formCustom.username"  placeholder="请输入登录账号" ></Input>
            </FormItem>
            <FormItem label="登录密码" prop="password">
                <Input type="password" v-model="formCustom.password"  placeholder="请输入登录密码" ></Input>
            </FormItem>
            <FormItem label="验证码" prop="captcha">
                <Input v-model="formCustom.captcha"  placeholder="请输入图形验证码"  ></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formCustom')">立即登录</Button>
                <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                <p style="margin-top: 10px">
                    尚未拥有账户？<a @click="this.$router.push('/register')">注册</a>
                </p>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入您的登录密码'));
                } else {
                    callback();
                }
            };
            const validateUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('登录账号不能为空'));
                }
            };
            const validateCaptcha = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('图形验证码不能为空'));
                }
            };
            return {
                formCustom: {
                    username: '',
                    password: '',
                    captcha: ''
                },
                ruleCustom: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    captcha: [
                        { validator: validateCaptcha, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>