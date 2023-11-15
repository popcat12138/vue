<template>
    <div style="padding: 10%">
        <el-form label-width="80px" size="small">
            <el-input v-model="form.id" v-show="false"></el-input>
            <el-form-item label="用户名">
                <el-input v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phoneNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" autocomplete="off" show-password></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveUserEdit">确 定</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserDetail",
        data(){
            return{
                userEntity: localStorage.getItem("userEntity") ? JSON.parse(localStorage.getItem("userEntity")) : {},
                form: {},
            }
        },
        created() {
            this.load()
        },
        methods:{
            load(){
                this.form = this.userEntity
            },

            saveUserEdit() {

                this.request.post("/admin/updateUserInfo",this.form).then(res=>{
                    if(!res){
                        this.$message.error("")
                    }else {
                        this.form.role=this.userEntity.role
                        this.userEntity=this.form
                        localStorage.setItem("userEntity",JSON.stringify(this.userEntity))
                        this.$router.push("/")
                        this.load()
                        this.$message.success("修改成功")
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>