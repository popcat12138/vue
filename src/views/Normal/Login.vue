<template>
    <div class="wrapper">
        <div style="margin: 150px">
            <h1 style="text-align: center">登录</h1>
            <br>
            <div style="padding-left: 15%;padding-right: 15%">
                <el-form :rules="rules">
                    <el-form-item label="登录名:" prop="username">
                        <el-input size="medium" style="margin: 10px" prefix-icon="el-icon-user" v-model="userEntity.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password">
                        <el-input size="medium" style="margin: 10px" prefix-icon="el-icon-lock" v-model="userEntity.password" show-password></el-input>
                    </el-form-item>
                    <div style="margin: 20px">
                        <el-button type="primary" size="small" @click="login">登录</el-button>
                        <el-button @click="addUser">前往注册</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Login",
        data(){
            return{
                userEntity:{},
                rules: {
                    username: [
                        { required: true, message: '请输入登录名' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登陆密码', trigger: 'blur' }
                    ]
                },
            }
        },
        methods:{
            login(){
                this.request.post("/userAction/login",this.userEntity).then(res=>{
                    localStorage.setItem("userEntity",JSON.stringify(res.data))
                    if(res.code==="300"){
                        this.$message.error("用户名或密码错误")
                    }else {
                        this.$message.success("登陆成功")
                        this.$router.push(("/"))
                        location. reload()
                    }
                })
            },
            addUser(){
                this.$router.push(("/register"))
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