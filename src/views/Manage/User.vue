<template>
    <div>
        <div>
            <el-input style="width: 200px" placeholder="按用户名模糊搜索" suffix-icon="el-icon-position" class="ml-5" v-model="userName"></el-input>
            <el-button class="ml-5" icon="el-icon-search" type="primary" @click="load">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
        </div>
        <el-table :data="tableData" :key="updateTable">
            <el-table-column prop="id" label="ID" width="140">
            </el-table-column>
            <el-table-column prop="userName" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="phoneNum" label="联系方式">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" align="center">
            </el-table-column>
            <el-table-column prop="role" label="角色" style="background-color: black"
                             :filters="[{ text: '管理员', value: 'admin' }, { text: '用户', value: 'normal' }]"
                             :filter-method="filterTag"
                             filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag type="primary" v-if="scope.row.role === 'admin'">管理员</el-tag>
                    <el-tag type="warning" v-if="scope.row.role === 'normal'">用户</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" @click="roleChange(scope.row.userName)">转换权限</el-button>
                    <el-button icon="el-icon-edit" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%" >
            <el-form label-width="80px" size="small">
                <el-input v-model="form.id" v-show="false"></el-input>
                <el-form-item label="用户名">
                    <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select clearable v-model="form.role" placeholder="请选择角色" style="width: 100%">
                        <el-option value="admin">管理员</el-option>
                        <el-option value="normal">普通用户</el-option>
                    </el-select>
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
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveUserEdit">确 定</el-button>
            </div>
        </el-dialog>

        <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-size="pageSize"
                    :page-sizes="[2,5,10,20]"
                    layout="total,sizes,prev,pager,next,jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import request from "@/utils/request";

    export default {
        name: "User",
        data(){
            return{
                tableData: [],
                updateTable:0,
                total:0,
                pageNum:1,
                pageSize:10,
                collapseBtnClass:'el-icon-s-fold',
                isCollapse:false,
                sideWidth:200,
                logoTextShow:true,
                userEntity: localStorage.getItem("userEntity") ? JSON.parse(localStorage.getItem("userEntity")) : {},
                oldUserName: '',
                dialogFormVisible: false,
                form: {},
                userName: '',
                userRole:''
            }
        },
        created() {
            this.load()
        },
        methods: {
            load(){
                request.get("http://localhost:8088/admin/userManagePage",{
                    params:{
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                        userName:this.userName
                    }
                }).then(res=>{
                    console.log(res)
                    this.tableData=res.data.data
                    this.total=res.data.total
                })
            },
            handleSizeChange(pageSize) {
                console.log(pageSize)
                this.pageSize = pageSize
                this.load()
            },
            handleCurrentChange(pageNum) {
                console.log(pageNum)
                this.pageNum = pageNum
                this.load()
            },
            roleChange(userName){
                request.get("http://localhost:8088/admin/userManageBan",{
                    params:{
                        oldUserName:userName
                    }
                }).then(res=>{
                    this.updateTable=Math.random()
                    this.$message.success("成功"+userName)
                    this.load()
                })
            },
            handleEdit(row) {
                this.form = JSON.parse(JSON.stringify(row))
                this.dialogFormVisible = true
            },
            saveUserEdit() {

                this.request.post("/admin/updateUserInfo",this.form).then(res=>{
                    if(!res){
                        this.$message.error("用户名或密码错误")
                    }else {
                        this.updateTable=Math.random()
                        this.load()
                        this.dialogFormVisible = false
                    }
                })
            },
            reset() {
                this.userName = ""
                this.load()
            },
            filterTag(value, row) {
                return row.role === value;
            }
        }
    }
</script>

<style scoped>

</style>