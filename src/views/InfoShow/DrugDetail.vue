<template>
    <div>
        <span style="margin-left: 2%;font-size: larger;font-weight: bolder">{{drugEntity.drugName}}</span> <el-button type="warning" icon="el-icon-star-off" circle @click="markBook(id)"></el-button>
        <div class="titleC">{{drugEntity.function}}</div>
        <div style="padding-left:2%;padding-right: 3%;padding-bottom: 3%;font-size: larger;line-height: 40px">
            <div v-if="drugEntity.img">
                &nbsp;<span>【图片】</span>
                <img :src="drugEntity.img" width="200px">
            </div>
            <div v-if="drugEntity.otherName">
                &nbsp;<span>【别名】</span>
                {{drugEntity.otherName}}
            </div>
            <div v-if="drugEntity.type">
                &nbsp;<span>【类型】</span>
                {{drugEntity.type}}
            </div>
            <div v-if="drugEntity.source">
                &nbsp;<span>【部位】</span>
                {{drugEntity.source}}
            </div>
            <div v-if="drugEntity.area">
                &nbsp;<span>【来源地】</span>
                {{drugEntity.area}}
            </div>
            <div v-if="drugEntity.feature">
                &nbsp;<span>【特征】</span>
                {{drugEntity.feature}}
            </div>
            <div v-if="drugEntity.taste">
                &nbsp;<span>【味】</span>
                {{drugEntity.taste}}
            </div>
            <div v-if="drugEntity.function">
                &nbsp;<span>【功能主治】</span>
                {{drugEntity.function}}
            </div>
            <div v-if="drugEntity.usage">
                &nbsp;<span>【使用方法】</span>
                {{drugEntity.usage}}
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "DrugDetail",
        data(){
            return{
                drugEntity:{},
                collectEntity:{},
                drugId:localStorage.getItem("drugId"),
                userEntity: localStorage.getItem("userEntity") ? JSON.parse(localStorage.getItem("userEntity")) : {},
            }
        },
        created() {
            this.load()
        },
        methods:{
            load()
            {
                this.request.get("/drug/getDrug/" + this.drugId).then(res => {
                    this.drugEntity = res.data
                })
            },
            markBook(){
                this.collectEntity.userId=this.userEntity.id
                this.collectEntity.type=4
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