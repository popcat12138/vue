<template>

    <header>
        <el-menu
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#CDB38B"
                text-color="#fff"
                active-text-color="#A52A2A"
        router>
            <el-row style="text-align: center">
                <el-col :span="1">
                    <el-menu-item style="display: flex;align-items: center;justify-content: center;" index="/"><img src="../assets/logo.jpeg" style="width: 50px;"></el-menu-item>
                </el-col>
                <el-col :span="2">
                    <el-submenu>
                        <template slot="title">我的收藏</template>
                        <el-menu-item index="/caseCollect">病例病案</el-menu-item>
                        <el-menu-item index="/bookCollect" @onclick.native="bookCollect()">医书信息</el-menu-item>
                        <el-menu-item index="/drugCollect">药品信息</el-menu-item>
                        <el-menu-item index="/combCollect">药方信息</el-menu-item>
                    </el-submenu>
                </el-col>
                <el-col :span="2">
                    <el-menu-item index="/">主页</el-menu-item>
                </el-col>
                <el-col :span="2">
                    <el-menu-item index="/caseList">病例病案</el-menu-item>
                </el-col>
                <el-col :span="2">
                    <el-menu-item index="/bookList">中医医书</el-menu-item>
                </el-col>
                <el-col :span="2">
                    <el-menu-item index="/drugList">中医药品</el-menu-item>
                </el-col>
                <el-col :span="2">
                    <el-menu-item index="/combList">药方信息</el-menu-item>
                </el-col>
                <el-col :span="2" :offset="9">
                    <el-menu-item v-if="userEntity.userName">
                        <el-dropdown>
                            <div style="text-align: center;color: white">
                                <span style="font-size: 12px;">{{ userEntity.userName }}</span>
                                <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                                <el-dropdown-item v-if="userEntity.role==='admin'" style="font-size: 14px; padding: 5px 0">
                                    <el-menu-item type="text" index="/home">后台管理</el-menu-item>
                                </el-dropdown-item>
                                <el-dropdown-item style="font-size: 14px; padding: 0px 0">
                                    <el-menu-item type="text" index="/userDetail">修改信息</el-menu-item>
                                </el-dropdown-item>
                                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                                    <el-menu-item type="text" @click="logout">退出登录</el-menu-item>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-menu-item>
                    <el-menu-item v-else index="/login">
                        登录
                    </el-menu-item>
                </el-col>
            </el-row>

        </el-menu>
    </header>

</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                userEntity: localStorage.getItem("userEntity") ? JSON.parse(localStorage.getItem("userEntity")) : {}
            };
        },

        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logout(){
                this.$router.push("/")
                this.userEntity.userName=null
                localStorage.removeItem("userEntity")
                this.$message.success("退出成功")
            },
        }
    }
</script>

<style scoped>
    .el-menu-demo{
        font-size: larger;
        font-weight: bolder;
    }
</style>