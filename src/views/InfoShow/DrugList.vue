<template>
    <div>
        <div>
            <h1 style="margin-left: 2%">中医药品</h1>
            <div>
                <div class="titleC">中药就是指在中医理论指导下，用于预防、治疗、诊断疾病并具有康复与保健作用的物质。中药主要来源于天然药及其加工品，包括植物药、动物药、矿物药及部分化学、生物制品类药物。由于中药以植物药居多，故有“诸药以草为本”的说法。</div>
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

        <el-row :gutter="20">
            <el-col :span="6" v-for="item in tableData" style="margin: 20px">
                <el-card shadow="hover" @click.native="drugDetail(item.id.toString())">
                    <div><img :src="item.img" width="30px"><span>《{{ item.drugName }}》</span> <span style="font-style: italic;font-size: small">分类：<span>{{item.type}}</span></span>
                        <el-button style="position: relative; margin-left: 80%; margin-right: 10%;margin-top: 0%" icon="el-icon-star-off" circle @click="markDrug(item.id)"></el-button>
                    </div>
                    <hr class="hrC">
                    <div>{{ item.briefInfo }}</div>
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
        name: "DrugList",
        data(){
            return{
                collectUserId:'',
                collectEntity:{},
                title:'',
                type:'',
                continueC:'0',
                isMark:true,
                tableData: [],
                updateTable:0,
                total:0,
                pageNum:1,
                pageSize:12,
                userEntity: localStorage.getItem("userEntity") ? JSON.parse(localStorage.getItem("userEntity")) : {},
                options: [{value: '解表', label: '解表'}, {value: '清热', label: '清热'}, {value: '利湿', label: '利湿'}],         }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                request.get("http://localhost:8088/drug/drugManagePage", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        drugName: this.title,
                        type: this.type,
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
            drugDetail(id){
                if(this.continueC==='0'){
                    localStorage.setItem("drugId",id)
                    this.$router.push("/drugDetail")
                }else{
                    this.continueC='0'
                }
            },
            markDrug(id){
                this.continueC='1'
                this.collectEntity.userId=this.userEntity.id
                this.collectEntity.type=4
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