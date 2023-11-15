<template>
    <div>
        <div>
            <el-input style="width: 200px" placeholder="按组方名称模糊搜索" suffix-icon="el-icon-position" class="ml-5" v-model="title"></el-input>
            <el-button class="ml-5" icon="el-icon-search" type="primary" @click="load">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
            <el-button type="success" icon="el-icon-circle-plus" @click="addComb" style="margin-left: 50%">添加药方信息</el-button>
        </div>
        <el-table :data="tableData" :key="updateTable">
            <el-table-column prop="id" label="ID" width="140">
            </el-table-column>
            <el-table-column prop="combName" label="药方名" width="200">
            </el-table-column>
            <el-table-column prop="otherName" label="别名" width="200">
            </el-table-column>
            <el-table-column prop="functions" label="功效" width="300" align="center">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="info" icon="el-icon-info" @click="detail(scope.row.id)">查看</el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteC(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="药方信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="combEntity" ref="caseForm">
                <el-form-item prop="combName">
                    <el-input placeholder="药方名" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium" prefix-icon="el-icon-user" v-model="combEntity.combName"></el-input>
                </el-form-item>
                <el-form-item prop="otherName">
                    <el-input placeholder="别名" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="combEntity.otherName"></el-input>
                </el-form-item>
                <el-form-item prop="recipe">
                    <el-input placeholder="组成" type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="combEntity.recipe"></el-input>
                </el-form-item>
                <el-form-item prop="function">
                    <el-input placeholder="功效" type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="combEntity.functions"></el-input>
                </el-form-item>
                <el-form-item prop="pre_method">
                    <el-input placeholder="使用注意" type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="combEntity.pre_method"></el-input>
                </el-form-item>
                <el-form-item prop="usages">
                    <el-input placeholder="用法用量" type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="combEntity.usages"></el-input>
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
        name: "Comb",
        data(){
            return{
                title:'',
                addOrUpdate:"",
                combEntity:{},
                serverIp: serverIp,
                dialogFormVisible: false,
                tableData: [],
                updateTable:0,
                total:0,
                pageNum:1,
                pageSize:10,
            }
        },
        created() {
            this.load()
        },
        methods:{
            load(){
                request.get("http://localhost:8088/comb/combManagePage",{
                    params:{
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                        combName:this.title
                    }
                }).then(res=>{
                    console.log(res)
                    this.tableData=res.data.data
                    this.total=res.data.total
                })
            },
            addComb(){
                this.addOrUpdate=""
                this.dialogFormVisible=true
                this.combEntity={}
            },
            save()
            {   this.request.post("/comb/addOrUpdateCombInfo",this.combEntity).then(res => {
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
                localStorage.setItem("combId",id)
                this.$router.push("/combDetail")
            },
            deleteC(id){
                this.request.get("/comb/delete/" + id).then(res => {
                    if(res.code==='400'){

                    }else{

                    }
                    this.load()
                })
            },
            reset() {
                this.title = ""
                this.load()
            },
            handleAvatarSuccess(res) {
                this.combEntity.fileLocation = res.location
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
                this.combEntity = JSON.parse(JSON.stringify(row))
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
</style>