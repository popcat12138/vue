<template>
    <div>
        <div>

            <el-input style="width: 200px" placeholder="按书名模糊搜索" suffix-icon="el-icon-position" class="ml-5" v-model="title"></el-input>
            <el-button class="ml-5" type="primary" icon="el-icon-search" @click="load">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
            <span style="margin-left: 15%;font-size: medium;font-weight: bold;color: chocolate">医书收藏</span>
        </div>
        <br>
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
                    <el-button type="danger" icon="el-icon-delete" @click="deleteC(scope.row.id)">取消收藏</el-button>
                </template>
            </el-table-column>
        </el-table>
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
        name: "BookCollect",
        data(){
            return{
                userEntity: localStorage.getItem("userEntity") ? JSON.parse(localStorage.getItem("userEntity")) : {},
                title:'',
                collectEntity:{},
                bookEntity:{},
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
                request.get("http://localhost:8088/book/bookManagePage",{
                    params:{
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                        title:this.title,
                        userId:this.userEntity.id
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
            detail(id){
                localStorage.setItem("bookId",id)
                this.$router.push("/bookDetail")
            },

            deleteC(id){
                this.collectEntity.userId=this.userEntity.id
                this.collectEntity.type=1
                this.collectEntity.collectId=id
                this.request.post("/collect/delete",this.collectEntity).then(res=>{
                    this.load()
                    if(!res){
                        this.$message.error("操作失败")
                    }else {
                        this.isMark=!this.isMark
                        this.$message.error("操作成功")
                    }
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
        }
    }
</script>

<style scoped>

</style>