<template>
    <div>
        <div>
            <h1 style="margin-left: 2%">病例病案</h1>
            <div>
                <div class="titleC">医案是中医治病时对有关症状、处方及用药的连续记录，最能反应中医辨证论治的精神及个体化治疗的特色。中医医案，是中医理、法、方、药综合运用的具体反映形式，它不仅是医疗活动的真实记录，而且还反应了医家的临床经验及思维活动。中医医案的重要性是由中医理论的思维方式和中医理论的具体形式决定的。
                </div>
                <div style="margin-left: 5%">
                    <el-input style="width: 200px" placeholder="按病例名模糊搜索" suffix-icon="el-icon-position" class="ml-5" v-model="title"></el-input>
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
                <el-card shadow="hover" @click.native="caseDetail(item.caseId.toString())">
                    <div><span>{{ item.caseTitle }}</span>
                        <el-button style="position: relative; margin-left: 80%; margin-right: 10%;margin-top: 0%" icon="el-icon-star-off" circle @click="markCase(item.caseId.toString())"></el-button>

                    </div>
                    <hr class="hrC">
                    <div style="font-style: italic;font-size: small">{{ item.caseDetail }}</div>
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
        name: "CaseList",
        data(){
            return{
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
                request.get("http://localhost:8088/case/caseManagePage", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        caseTitle: this.title,
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
            caseDetail(id){
                if(this.continueC==='0'){
                    localStorage.setItem("caseId",id)
                    this.$router.push("/caseDetail")
                }else{
                    this.continueC='0'
                }
            },
            markCase(id){
                this.continueC='1'
                this.collectEntity.userId=this.userEntity.id
                this.collectEntity.type=2
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