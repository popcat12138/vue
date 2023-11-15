<template>
    <div>

        <el-dialog title="添加书籍" :visible.sync="dialogFormVisible" width="30%">
            <el-card>
                <el-form label-width="80px" size="small">
                    <el-upload
                            class="avatar-uploader"
                            :action="'http://' + serverIp +':8088/admin/uploadFile'"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                    >
                        <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-form-item label="Email">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="name">
                        <el-input v-model="form.userName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Age">
                        <el-input v-model="form.userAge" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="role">
                        <el-input v-model="form.role" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="save">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

        </el-dialog>
    </div>
</template>

<script>
    import {serverIp} from "../../../public/config";

    export default {
        name: "Form",
        data() {
            return {
                dialogFormVisible: true,
                serverIp: serverIp,
                form: {},
                userEntity: localStorage.getItem("userEntity") ? JSON.parse(localStorage.getItem("userEntity")) : {}
            }
        },
        created() {
            this.getUser().then(res => {
                console.log(res)
                this.form = res
            })
        },
        methods: {
            async getUser() {
                return (await this.request.get("/userAction/getUser/" + this.userEntity.id)).data
            },
            save() {
                this.request.post("/userAction/updateUserInfo", this.form).then(res => {
                    if (res.code === '200') {
                        this.$message.success("保存成功")

                        // // 触发父级更新User的方法
                        // this.$emit("refreshUser")

                        // 更新浏览器存储的用户信息
                        this.getUser().then(res => {
                            res.token = JSON.parse(localStorage.getItem("userEntity")).token
                            localStorage.setItem("userEntity", JSON.stringify(res))
                        })

                    } else {
                        this.$message.error("保存失败")
                    }
                })
            },
            handleAvatarSuccess(res) {
                this.form.avatarUrl = res
                this.$message.success("上传文件成功")
            }
        }
    }

</script>

<style scoped>
    .avatar-uploader {
        text-align: center;
        padding-bottom: 10px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 138px;
        height: 138px;
        line-height: 138px;
        text-align: center;
    }
    .avatar {
        width: 138px;
        height: 138px;
        display: block;
    }
</style>