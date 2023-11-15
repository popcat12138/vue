<template>
    <div>
        <div>
            <el-input style="width: 200px" placeholder="输入名称模糊搜索" suffix-icon="el-icon-position" class="ml-5" v-model="title"></el-input>
            <el-button class="ml-5" type="primary" icon="el-icon-search" @click="load">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
            <el-button type="success" icon="el-icon-circle-plus" @click="addCase" style="margin-left: 50%">添加药品信息</el-button>
        </div>
        <el-table :data="tableData" :key="updateTable">
            <el-table-column prop="id" label="ID" width="140">
            </el-table-column>
            <el-table-column prop="drugName" label="药名" width="200">
            </el-table-column>
            <el-table-column prop="otherName" label="别名" width="200">
            </el-table-column>
            <el-table-column prop="functions" label="功能作用" width="320" align="center">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="info" icon="el-icon-info" @click="detail(scope.row.id)">查看</el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteC(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="药品信息" :visible.sync="dialogFormVisible" width="60%">
            <el-form :model="drugEntity" ref="caseForm" style="padding-left: 2%;padding-right: 2%">
                <el-upload
                        class="avatar-uploader"
                        :action="'http://' + serverIp +':8088/admin/uploadFile'"
                        :show-file-list="true"
                        :on-success="handleAvatarSuccess"
                >
                    <img v-if="drugEntity.img" :src="drugEntity.img" style="width: 100px">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-form-item prop="drugName">
                    <el-input placeholder="药名" size="medium" v-model="drugEntity.drugName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="别名"  size="medium" v-model="drugEntity.otherName"></el-input>
                </el-form-item>
                <el-form-item prop="otherName">
                                    </el-form-item>
                <el-form-item prop="type" label="类型">
                    <el-select v-model="drugEntity.type" placeholder="类型选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="source">
                    <el-input placeholder="药用部位" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium" v-model="drugEntity.source" show-password></el-input>
                </el-form-item>
                <el-form-item prop="area">
                    <el-input placeholder="地区" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium"  v-model="drugEntity.area" show-password></el-input>
                </el-form-item>
                <el-form-item prop="feature">
                    <el-input placeholder="药材性状" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium" v-model="drugEntity.feature" show-password></el-input>
                </el-form-item>
                <el-form-item prop="taste">
                    <el-input placeholder="性味归经" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="drugEntity.taste" show-password></el-input>
                </el-form-item>
                <el-form-item prop="functions">
                    <el-input placeholder="功效与作用" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="drugEntity.functions" show-password></el-input>
                </el-form-item>
                <el-form-item prop="usage">
                    <el-input placeHolder="用法" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium"  v-model="drugEntity.usage"></el-input>
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
        name: "Drug",
        data(){
            return{
                addOrUpdate:'',
                title:"",
                drugEntity:{},
                serverIp: serverIp,
                dialogFormVisible: false,
                tableData: [],
                updateTable:0,
                total:0,
                pageNum:1,
                pageSize:10,
                options: [{value: '解表', label: '解表'}, {value: '清热', label: '清热'}, {value: '利湿', label: '利湿'}],
            }
        },
        created() {
            this.load()
        },
        methods:{
            load(){
                request.get("http://localhost:8088/drug/drugManagePage",{
                    params:{
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                        drugName:this.title
                    }
                }).then(res=>{
                    console.log(res)
                    this.tableData=res.data.data
                    this.total=res.data.total
                })
            },
            addCase(){
                this.addOrUpdate=""
                this.dialogFormVisible=true
                this.drugEntity={}
            },
            save()
            {   this.request.post("/drug/addOrUpdateDrugInfo",this.drugEntity).then(res => {
                if(res.code === '200') {
                    this.$message.success("保存成功")
                } else {
                    this.$message.error(res.msg)
                }
                this.load()
                this.dialogFormVisible=false
            })

            },
            reset() {
                this.title = ""
                this.load()
            },
            detail(id){
                localStorage.setItem("drugId",id)
                this.$router.push("/drugDetail")
            },
            deleteC(id){
                this.request.get("/drug/delete/" + id).then(res => {
                    if(res.code==='400'){

                    }else{

                    }
                    this.load()
                })
            },

            handleAvatarSuccess(res) {
                this.drugEntity.img = res.location
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
                this.drugEntity = JSON.parse(JSON.stringify(row))
                this.dialogFormVisible = true
                this.addOrUpdate="ooo"
            },
            closeWin(){
                this.dialogFormVisible = false
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
        color: #8c939d;
        width: 50px;
        height: 50px;
        text-align: center;
    }
</style>