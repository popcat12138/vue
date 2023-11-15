<template>
    <div>
        <span style="margin-left: 2%;font-size: larger;font-weight: bolder">{{combEntity.combName}}</span> <el-button type="warning" icon="el-icon-star-off" circle @click="markBook(id)"></el-button>
        <div class="titleC">{{combEntity.functions}}</div>
        <div style="padding-left:2%;padding-right: 3%;padding-bottom: 3%;font-size: larger;line-height: 40px">
            <div v-if="combEntity.combName">
                &nbsp;<span>【药方名】</span>
                {{combEntity.combName}}
            </div>
            <div v-if="combEntity.otherName">
                &nbsp;<span>【别名】</span>
                {{combEntity.otherName}}
            </div>
            <div v-if="combEntity.recipe">
                &nbsp;<span>【成分】</span>
                {{combEntity.recipe}}
            </div>
            <div v-if="combEntity.functions">
                &nbsp;<span>【功能主治】</span>
                {{combEntity.functions}}
            </div>
            <div v-if="combEntity.pre_method">
                &nbsp;<span>【前置处理】</span>
                {{combEntity.pre_method}}
            </div>
            <div v-if="combEntity.usage">
                &nbsp;<span>【用法用量】</span>
                {{combEntity.usages}}
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "CombDetail",
        data(){
            return{
                combEntity:{},
                collectEntity:{},
                combId:localStorage.getItem("combId"),
                userEntity: localStorage.getItem("userEntity") ? JSON.parse(localStorage.getItem("userEntity")) : {},
            }
        },
        created() {
            this.load()
        },
        methods:{
            load()
            {
                this.request.get("/comb/getComb/" + this.combId).then(res => {
                    this.combEntity = res.data
                })
            },
            markBook(){
                this.collectEntity.userId=this.userEntity.id
                this.collectEntity.type=3
                this.collectEntity.collectId=this.combId
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