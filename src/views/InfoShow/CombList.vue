<template>
    <div>
        <div>
            <h1 style="margin-left: 2%">中医方剂</h1>
            <div>
                <div class="titleC">中医书籍是中国传统医学文化的重要组成部分，涵盖了中医的理论体系、临床经验、药物学、针灸、推拿等多个方面。中医书籍的特点在于，它们不仅是医学知识的载体，更是中华文化和哲学思想的体现。</div>
                <div style="margin-left: 5%">
                    <el-input style="width: 200px" placeholder="按药方名模糊搜索" suffix-icon="el-icon-position" class="ml-5" v-model="title"></el-input>
                    <el-input style="width: 300px" placeholder="输入药材查找处方（用空分隔）" suffix-icon="el-icon-position" class="ml-5" v-model="recipe"></el-input>
                    <el-button class="ml-5" type="primary" icon="el-icon-search" @click="load">搜索</el-button>
                    <el-button type="warning" @click="reset">重置</el-button>
                </div>
            </div>
        </div>

        <el-row :gutter="20">
            <el-col :span="6" v-for="item in tableData" style="margin: 20px">
                <el-card shadow="hover" @click.native="combDetail(item.id.toString())">
                    <div><span>《{{ item.combName }}》</span> <span style="font-style: italic;font-size: small">分类：<span>{{item.type}}</span></span>
                        <el-button style="position: relative; margin-left: 80%; margin-right: 10%;margin-top: 0%" icon="el-icon-star-off" circle @click="markComb(item.id.toString())"></el-button>
                    </div>
                    <hr class="hrC">
                    <div>{{ item.function }}</div>
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
        name: "CombList",
        data(){
            return{
                recipe:'',
                collectUserId:'',
                title:'',
                type:'',
                continueC:'0',
                isMark:true,
                collectEntity:{},
                tableData: [],
                updateTable:0,
                total:0,
                pageNum:1,
                pageSize:12,
                userEntity: localStorage.getItem("userEntity") ? JSON.parse(localStorage.getItem("userEntity")) : {},
                options: [{
                    value: '选项1',
                    label: '古籍'
                }, {
                    value: '选项2',
                    label: '现代'
                }, {
                    value: '选项3',
                    label: '养生'
                }],
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                request.get("http://localhost:8088/comb/combManagePage", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        combName: this.title,
                        type: this.type,
                        recipe:this.recipe,
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
            combDetail(id){
                if(this.continueC==='0'){
                    localStorage.setItem("combId",id)
                    this.$router.push("/combDetail")
                }else{
                    this.continueC='0'
                }
            },
            markComb(id){
                this.continueC='1'
                this.collectEntity.userId=this.userEntity.id
                this.collectEntity.type=3
                this.collectEntity.collectId=id
                this.request.post("/collect/add",this.collectEntity).then(res=>{
                    if(res.data.result===404){
                        this.$message.error("已在收藏夹中")
                    }else {
                        this.isMark=!this.isMark
                        this.$message.error("收藏成功")
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