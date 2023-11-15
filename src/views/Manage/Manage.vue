<template>
  <div style="height: 100%;">
    <el-container style="min-height: 100vh; border: 1px solid #eee">
      <el-aside :width="isCollapse?'64px':'200px'" style="background-color: rgb(238, 241, 246);">
<!--      "sideWidth+'px'"-->
        <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow"></Aside>
      </el-aside>

      <el-container>
        <el-header style="font-size: 12px;border-bottom: 1px solid grey;line-height: 60px;display: flex">
          <div style="flex:1;font-size:18px">
            <span :class="collapseBtnClass" style="cursor: pointer"></span>
          </div>
          <el-dropdown style="width: 150px; cursor: pointer; text-align: right">
            <div style="display: inline-block">
              <span>{{ userEntity.userName }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            </div>
            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <router-link to="/">退出后台</router-link>
              </el-dropdown-item>
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <span style="text-decoration: none" @click="logout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>


        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Aside from "@/components/Aside";
export default {
  name: 'HomeView',
  components: {
    Aside
  },
  data() {

    return {
      total:0,
      pageNum:1,
      pageSize:2,
      collapseBtnClass:'el-icon-s-fold',
      isCollapse:false,
      sideWidth:200,
      logoTextShow:true,
      userEntity: localStorage.getItem("userEntity") ? JSON.parse(localStorage.getItem("userEntity")) : {}
    }
  },
  created() {
    if(!this.userEntity.role==="admin"){
      this.$router.push("/")
      this.$message.error("请检查自己的权限")
    }
  },
  methods:{
    logout(){
      this.$router.push("/")
      localStorage.removeItem("userEntity")
      this.$message.success("退出成功")
    }
  }
}
</script>
