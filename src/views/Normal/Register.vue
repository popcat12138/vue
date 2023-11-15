<template>
    <div class="wrapper">
        <div style="margin: 150px">
            <h1 style="text-align: center">注册</h1>
            <div style="padding-left: 15%;padding-right: 15%">
                <el-form :model="userEntity" :rules="rules" ref="userForm">
                    <el-form-item prop="userName">
                        <el-input placeholder="请输入账号" size="medium" style="margin: 10px" prefix-icon="el-icon-user" v-model="userEntity.userName"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="请输入密码" size="medium" style="margin: 10px" prefix-icon="el-icon-lock" v-model="userEntity.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item prop="联系方式">
                        <el-input size="medium" placeholder="联系方式" style="margin: 10px" prefix-icon="el-icon-user" v-model="userEntity.phoneNum"></el-input>
                    </el-form-item>
                    <el-form-item prop="邮箱">
                        <el-input size="medium" placeholder="邮箱" style="margin: 10px" prefix-icon="el-icon-user" v-model="userEntity.email"></el-input>
                    </el-form-item>
                    <el-form-item style="margin: 5px 0; text-align: right">
                        <el-button type="primary" size="small"  autocomplete="off" @click="login">注册</el-button>
                        <el-button type="warning" size="small"  autocomplete="off" @click="$router.push('/login')">返回登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

    import request from "@/utils/request";

    export default {
        name: "Register",
        data(){
            return{
                userEntity:{},
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' },
                        { validator:this.existUserName,trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    age: [
                        { required: true, message: '请输入年龄', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            login()
            {
                this.request.post("/userAction/register",this.userEntity).then(res => {
                    if(res.code === '200') {
                        this.$message.success("注册成功")
                    } else {
                        this.$message.error(res.msg)
                    }
                })
                this.$refs['userForm'].validate((valid) => {
                    if (valid) {  // 表单校验合法

                    }
                });
            },
            existUserName(){
                request.get("http://localhost:8088/userAction/existUser",{
                    params:{
                        userName:this.userEntity.userName,
                    }
                }).then(res=>{
                if(res.code==='404'){
                    this.$message.error("用户名重复，请更换")
                    return false
                }else{
                    this.$message.success("用户名验证通过")
                    return true
                }
                })
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        background-color: white;
        height: 100vh;
        overflow: hidden;
    }
</style>