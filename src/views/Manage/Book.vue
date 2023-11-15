<template>
    <div>
        <div>
            <el-input style="width: 200px" placeholder="按书名模糊搜索" suffix-icon="el-icon-position" class="ml-5" v-model="title"></el-input>
            <el-button class="ml-5" type="primary" icon="el-icon-search" @click="load">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
            <el-button type="success" icon="el-icon-circle-plus" @click="addBook" style="margin-left: 50%">添加医书</el-button>
        </div>
        <el-table :data="tableData" :key="updateTable">
            <el-table-column prop="id" label="ID" width="140">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="120">
            </el-table-column>
            <el-table-column prop="type" label="分类">
            </el-table-column>
            <el-table-column prop="briefInfo" label="简介" align="center">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="info" icon="el-icon-info" @click="detail(scope.row.id)">查看</el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteC(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="医书信息" :visible.sync="dialogFormVisible" width="50%">
            <el-form :model="bookEntity" :rules="rules" ref="bookForm" style="padding: 5%">
                <el-upload
                        class="el-upload"
                        :action="'http://' + serverIp +':8088/admin/uploadFile'"
                        :show-file-list="true"
                        :on-success="handleAvatarSuccess"
                >
                    <el-button size="small" type="primary">点击上传</el-button><span slot="tip">只能上传pdf文件</span>
                </el-upload>
                <el-form-item prop="title" label="名称">
                    <el-input placeholder="title" size="medium" style="margin: 10px"  v-model="bookEntity.title"></el-input>
                </el-form-item>
                <el-form-item prop="type" label="类型">
                    <el-select v-model="bookEntity.type" placeholder="类型选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="briefInfo" label="简介">
                    <el-input type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="请输入内容" size="medium" style="margin: 10px" v-model="bookEntity.briefInfo"></el-input>
                </el-form-item>

                <el-form-item style="margin: 5px 0; text-align: right">
                    <el-button v-if="addOrUpdate" type="primary" size="small"  autocomplete="off" @click="save">更新</el-button>
                    <el-button v-else type="primary" size="small"  autocomplete="off" @click="save">添加</el-button>
                    <el-button type="warning" size="small"  autocomplete="off" @click="closeWin">取消</el-button>
                </el-form-item>
            </el-form>
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

    import {serverIp} from "../../../public/config";

    export default {
        name: "Book",
        data(){
            return{
                title:'',
                addOrUpdate:'',
                bookEntity:{},
                serverIp: serverIp,
                dialogFormVisible: false,
                tableData: [],
                updateTable:0,
                total:0,
                pageNum:1,
                pageSize:10,
                rules: {
                    title: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请输入类型', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    briefInfo: [
                        { min: 0, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
                    ],
                },
                options: [{
                    value: '古籍', label: '古籍'}, {value: '现代', label: '现代'}, {value: '养生', label: '养生'} ,{value: '内科', label: '内科'}, {value: '妇科', label: '妇科'}, {value: '儿科', label: '儿科'},],
            }
        },
        created() {
            this.load()
        },
        methods:{
            load(){
                request.get("http://localhost:8088/book/bookManagePage",{
                    params:{
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                        title:this.title
                    }
                }).then(res=>{
                    console.log(res)
                    this.tableData=res.data.data
                    this.total=res.data.total
                })
            },
            reset() {
                this.title = ""
                this.load()
            },
            addBook(){
                this.addOrUpdate=""
                this.dialogFormVisible=true
                this.bookEntity={}
            },
            save()
            {   this.request.post("/book/addOrUpdateBook",this.bookEntity).then(res => {
                if(res.code === '200') {
                    this.$message.success("保存成功")
                } else {
                    this.$message.error(res.msg)
                }
                this.load()
                this.dialogFormVisible=false
            })
            },
            detail(id){
                localStorage.setItem("bookId",id)
                this.$router.push("/bookDetail")
            },
            deleteC(id){
                this.request.get("/book/delete/" + id).then(res => {
                    if(res.code==='400'){

                    }else{

                    }
                    this.load()
                })
            },

            handleAvatarSuccess(res) {
                this.bookEntity.fileLocation = res.location
                console.log(res)
                this.$message.success("上传文件成功")
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
            handleEdit(row) {
                this.bookEntity = JSON.parse(JSON.stringify(row))
                this.addOrUpdate="ooo"
                this.dialogFormVisible = true
            },
            closeWin(){
                this.dialogFormVisible = false
            }
        }
    }
</script>

<style scoped>
    .el-upload:hover {
        border-color: #409EFF;
    }

</style>