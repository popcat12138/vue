<template>

    <div>
        <div style="text-align: center"><h1>后台管理</h1></div>
        <br><br><br><br><br><br><br>
        <el-row :gutter="20">
            <el-col :span="6">
                <div>
                    <el-statistic title="病案数量">
                        <template slot="formatter"> {{caseNum}} </template>
                    </el-statistic>
                </div>
            </el-col>
            <el-col :span="6">
            <div>
                <el-statistic title="医书数量">
                    <template slot="formatter"> {{bookNum}} </template>
                </el-statistic>
            </div>
        </el-col>
            <el-col :span="6">
            <div>
                <el-statistic title="药品数量">
                    <template slot="formatter"> {{drugNum}} </template>
                </el-statistic>
            </div>
        </el-col>
            <el-col :span="6">
            <div>
                <el-statistic title="处方数量">
                    <template slot="formatter"> {{combNum}} </template>
                </el-statistic>
            </div>
        </el-col>
        </el-row>
    </div>
</template>

<script>
    import request from "@/utils/request";
    export default {
        name: "Home",
        data() {
            return {
                caseNum:"",
                drugNum:"",
                bookNum:"",
                combNum:""
            };
        },
        created() {
            this.load()
        },
        methods:{
            load(){
                request.get("http://localhost:8088/admin/home",{
                    params:{

                    }
                }).then(res=>{
                    console.log(res)
                    this.caseNum=res.data.caseNum
                    this.drugNum=res.data.drugNum
                    this.bookNum=res.data.bookNum
                    this.combNum=res.data.combNum
                })
            }
        }
    }
</script>

<style scoped>

</style>