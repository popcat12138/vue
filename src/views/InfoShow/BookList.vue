<template>
    <div>
        <div>
            <h1 style="margin-left: 2%">中医书籍</h1>
            <div>
                <div class="titleC">中医书籍是中国传统医学文化的重要组成部分，涵盖了中医的理论体系、临床经验、药物学、针灸、推拿等多个方面。中医书籍的特点在于，它们不仅是医学知识的载体，更是中华文化和哲学思想的体现。</div>
                <div style="margin-left: 5%">
                    <el-input style="width: 200px" placeholder="按书名模糊搜索" suffix-icon="el-icon-position" class="ml-5" v-model="title"></el-input>
                    <el-select v-model="type" placeholder="类型选择(默认为空)">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button class="ml-5" type="primary" icon="el-icon-search" @click="load">搜索</el-button>
                    <el-button type="warning" @click="reset">重置</el-button>
                </div>
            </div>
        </div>

            <el-row :gutter="24">
                <el-col :span="7"  style="margin: 20px" v-for="item in tableData">
                    <el-card shadow="hover" @click.native="bookDetail(item.id)">
                        <div><span>《{{ item.title }}》</span> <span style="font-style: italic;font-size: small">分类：<span>{{item.type}}</span></span>
                            <el-button style="position: relative; margin-left: 80%; margin-right: 10%;margin-top: 0%" icon="el-icon-star-off" circle @click="markBook(item.id)"></el-button>
                        </div>
                        <hr class="hrC">
                        <div style="font-style: italic;font-size: small">{{ item.briefInfo }}</div>
                    </el-card>
                </el-col>
            </el-row>
            <br>
            <br>
            <br>
<!--        </div>-->
        <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-size="pageSize"
                    :page-sizes="[6,12,16,24]"
                    layout="total,sizes,prev,pager,next,jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import request from "@/utils/request";
    export default {
        name: "BookList",
        data(){
            return{
                collectEntity:{},
                collectUserId:'',
                title:'',
                type:'',
                continueC:'0',
                isMark:true,
                bookEntity:{},
                tableData: [],
                updateTable:0,
                total:0,
                pageNum:1,
                pageSize:12,
                userEntity: localStorage.getItem("userEntity") ? JSON.parse(localStorage.getItem("userEntity")) : {},
                options: [{
                    value: '古籍', label: '古籍'}, {value: '现代', label: '现代'}, {value: '养生', label: '养生'} ,{value: '内科', label: '内科'}, {value: '妇科', label: '妇科'}, {value: '儿科', label: '儿科'},],

            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                request.get("http://localhost:8088/book/bookManagePage", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        title: this.title,
                        type: this.type,
                        // userId:this.collectUserId
                    }
                }).then(res => {
                    console.log(res)
                    this.tableData = res.data.data
                    this.total = res.data.total
                })
            },
            reset(){
                this.title = ""
                this.type=""
                this.load()
            },
            bookDetail(id){
                if(this.continueC==='0'){
                    this.$message(id)
                    localStorage.setItem("bookId",id)
                    this.$router.push("/bookDetail")
                }else{
                    this.continueC='0'
                }
            },
            markBook(id){
                this.continueC='1'
                this.collectEntity.userId=this.userEntity.id
                this.collectEntity.type=1
                this.collectEntity.collectId=id
                this.request.post("/collect/add",this.collectEntity).then(res=>{
                    if(res.data.result===404){
                        this.$message.error("已在收藏夹中"+res.data.result)
                    }else {
                        this.isMark=!this.isMark
                        this.$message.error("收藏成功"+res.data.result)
                    }
                })
                this.load()

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
            }
        }
    }
</script>

<style scoped>
    .titleC {
        font-size: 14px;
        line-height: 1.5em;
        color: #693A10;
        border-bottom: 1px dashed;
        padding: 5px;
        width: 720px;
        margin: 0 10px 10px;
        overflow: hidden;
    }
    .hrC{
        height:1px;
        border:none;
        border-top:1px dashed #0066CC;
        width: 50%;
    }
    .el-row{

        display:flex;

        flex-wrap: wrap;

    }
</style>