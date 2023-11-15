<template>
    <div>
        <div>
            <el-input style="width: 200px" placeholder="按标题模糊搜索" suffix-icon="el-icon-position" class="ml-5" v-model="caseTitle"></el-input>
            <el-button class="ml-5" type="primary" icon="el-icon-search" @click="load">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
            <el-button type="success" icon="el-icon-circle-plus" @click="addCase" style="margin-left: 50%">添加病例</el-button>
        </div>
        <el-table :data="tableData" :key="updateTable">
            <el-table-column prop="caseId" label="ID" width="150">
            </el-table-column>
            <el-table-column prop="caseTitle" label="标题" width="300">
            </el-table-column>
            <el-table-column prop="caseDetail" label="简介" width="300" align="center">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="info" icon="el-icon-info" @click="detail(scope.row.caseId)">查看</el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteC(scope.row.caseId)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="病例信息" :visible.sync="dialogFormVisible" width="60%">
            <el-form :model="caseEntity" ref="caseForm" style="padding-left: 2%;padding-right: 2%">
                <el-form-item prop="caseTitle">
                    <el-input placeholder="病案标题"type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium" prefix-icon="el-icon-user" v-model="caseEntity.caseTitle"></el-input>
                </el-form-item>
                <el-form-item prop="caseDetail" lable="病例简介">
                    <el-input placeholder="病例简介" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="caseEntity.caseDetail"></el-input>
                </el-form-item>
                <el-form-item prop="caseInfo" lable="基础信息">
                    <el-input placeholder="基础信息 例：男，xx岁" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="caseEntity.caseInfo"></el-input>
                </el-form-item>
                <el-form-item prop="caseSelf" lable="病患自述">
                    <el-input placeholder="病患自述" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="caseEntity.caseSelf"></el-input>
                </el-form-item>
                <el-form-item prop="caseCheck" lable="检查过程">
                    <el-input placeholder="检查过程" type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="caseEntity.caseCheck"></el-input>
                </el-form-item>
                <el-form-item prop="caseResult" lable="检查结果">
                    <el-input placeholder="检查结果" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="caseEntity.caseResult"></el-input>
                </el-form-item>
                <el-form-item prop="caseProcess" lable="治疗过程">
                    <el-input placeholder="治疗过程" type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}" size="medium" prefix-icon="el-icon-lock" v-model="caseEntity.caseProcess"></el-input>
                </el-form-item>
                <el-form-item prop="caseOther" lable="补充">
                    <el-input placeHolder="补充" type="textarea"
                              :autosize="{ minRows: 1, maxRows: 4}" size="medium" prefix-icon="el-icon-user" v-model="caseEntity.caseOther"></el-input>
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
        name: "Case",
        data(){
            return{
                combList:[],
                caseTitle:'',
                addOrUpdate:'',
                caseEntity:{},
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
                request.get("http://localhost:8088/case/caseManagePage",{
                    params:{
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                        caseTitle:this.caseTitle,
                        combName:this.combName
                    }
                }).then(res=>{
                    console.log(res)
                    this.tableData=res.data.data
                    this.total=res.data.total
                })
            },
            addCase(){
                this.dialogFormVisible=true
                this.caseEntity={}
            },
            save()
            {   this.request.post("/case/addOrUpdateCase",this.caseEntity).then(res => {
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
                localStorage.setItem("caseId",id)
                this.$router.push("/caseDetail")
            },
            reset() {
                this.caseTitle = ""
                this.load()
            },
            deleteC(id){
                this.request.get("/case/delete/" + id).then(res => {
                    if(res.code==='400'){
                    }else{
                    }
                    this.load()
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
            handleEdit(row) {
                this.caseEntity = JSON.parse(JSON.stringify(row))
                this.addOrUpdate="ooo"
                this.dialogFormVisible = true
            },
            closeWin(){
                this.dialogFormVisible = false
            },
        }
    }
</script>

<style scoped>

</style>