<template>
    <el-menu :default-openeds="['1', '3']" style="min-height: 100%;overflow-x: hidden;" background-color="rgb(48,65,86)"
             text-color="#fff" active-text-color="red"
             :collapse-transition="false"
             router>
        <div style="height:60px; line-height:60px; text-align:center">
            <img src="../assets/logo.png" style="width:20px;position:relative;top:5px;margin-right: 5px">
            <b style="color: white">后台管理</b>
        </div>
        <div>
            <el-menu-item index="/home" style="min-width:200px;text-align:center;font-size: medium" class="el-icon-s-home"> 主页</el-menu-item>
        </div>
        <div>
            <el-menu-item index="/user" style="min-width:200px;text-align:center;font-size: medium" class="el-icon-user-solid"> 用户管理</el-menu-item>
        </div>
        <div>
            <el-menu-item index="/book" style="min-width:200px;text-align:center;font-size: medium" class="el-icon-s-management"> 医书管理</el-menu-item>
        </div>
        <div>
            <el-menu-item index="/case" style="min-width:200px;text-align:center;font-size: medium" class="el-icon-s-order"> 病例管理</el-menu-item>
        </div>
        <div>
            <el-menu-item index="/drug" style="min-width:200px;text-align:center;font-size: medium" class="el-icon-s-help"> 医药管理</el-menu-item>
        </div>
        <div>
            <el-menu-item index="/comb" style="min-width:200px;text-align:center;font-size: medium" class="el-icon-menu"> 药方管理</el-menu-item>
        </div>
    </el-menu>
</template>

<script>
    export default {
        name: "Aside",
    }
</script>

<style scoped>

</style>