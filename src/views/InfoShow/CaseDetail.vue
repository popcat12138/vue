<template>
<div>
    <span style="margin-left: 2%;font-size: larger;font-weight: bolder">{{caseEntity.caseTitle}}</span> <el-button type="warning" icon="el-icon-star-off" circle @click="markBook(id)"></el-button>
    <div class="titleC">{{caseEntity.caseDetail}}</div>
    <div style="padding-left:2%;padding-right: 3%;padding-bottom: 3%;font-size: larger;line-height: 40px">
        <div v-if="caseEntity.caseInfo">
            &nbsp;<span>【患者信息】</span>
            {{caseEntity.caseInfo}}
        </div>
        <div v-if="caseEntity.caseSelf">
            &nbsp;<span>【患者主诉】</span>
            {{caseEntity.caseSelf}}
        </div>
        <div v-if="caseEntity.caseCheck">
            &nbsp;<span>【检查过程】</span>
            {{caseEntity.caseCheck}}
        </div>
        <div v-if="caseEntity.caseResult">
            &nbsp;<span>【检查结果】</span>
            {{caseEntity.caseResult}}
        </div>
        <div v-if="caseEntity.caseProcess">
            &nbsp;<span>【治疗】</span>
            {{caseEntity.caseProcess}}
        </div>
        <div v-if="caseEntity.caseOther">
            <span>【补充】</span>
            {{caseEntity.caseOther}}
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: "CaseDetail",
        data(){
            return{
                caseEntity:{},
                collectEntity:{},
                caseId:localStorage.getItem("caseId"),
                userEntity: localStorage.getItem("userEntity") ? JSON.parse(localStorage.getItem("userEntity")) : {},
            }
        },
        created() {
            this.load()
        },
        methods:{
            load()
            {
                this.request.get("/case/getCase/" + this.caseId).then(res => {
                    this.caseEntity = res.data
                })
            },
            markBook(){
                this.collectEntity.userId=this.userEntity.id
                this.collectEntity.type=2
                this.collectEntity.collectId=this.caseId
                this.request.post("/collect/add",this.collectEntity).then(res=>{
                    if(res.data.result===404){
                        this.$message.error("已在收藏夹中")
                    }else {
                        this.isMark=!this.isMark
                        this.$message.error("收藏成功")
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .titleC {
        font-size: 16px;
        line-height: 1.5em;
        color: #693A10;
        border-bottom: 1px dashed;
        padding-left: 10px;
        width: 720px;
        margin: 0 10px 10px;
        overflow: hidden;
    }
</style>