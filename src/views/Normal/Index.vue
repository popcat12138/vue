<template>
    <div>
        <el-row>
            <el-col :span="10" offset=1>
                <img src="http://localhost:8088/file/indexPic.jpeg">
            </el-col>
            <el-col :span="10" offset=1>
                <img src="http://localhost:8088/file/indexPic.jpeg">
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="10" offset=1>
                <el-card shadow="hover" style="border-radius: 4px">
                    <h3>病例</h3>
                    <div style="margin-left: 10px" v-for="item in caseData">
                        <el-button size="medium" type="text" @click="caseDetail(item.caseId.toString())">{{item.caseTitle}}</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="10" offset=1>
                <el-card shadow="hover" style="border-radius: 4px">
                    <h3>药方</h3>
                    <div style="margin-left: 10px" v-for="item in combData">
                        <el-button size="medium" type="text" @click="combDetail(item.id.toString())">{{item.combName}}</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <br><br>
        <el-row>
            <el-col :span="10" offset=1>
                <el-card shadow="hover" style="border-radius: 4px">
                    <h3>药品</h3>
                    <div style="margin-left: 10px" v-for="item in drugData">
                        <el-button size="medium" type="text" @click="drugDetail(item.id.toString())">{{item.drugName}}</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="10" offset=1>
                <el-card shadow="hover" style="border-radius: 4px">
                    <h3>医书</h3>
                    <div style="margin-left: 10px" v-for="item in bookData">
                        <el-button size="medium" type="text" @click="bookDetail(item.id.toString())">{{item.title}}</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import request from "@/utils/request";

    export default {
        name: "Index",
        data(){
            return{
                bookData: [],
                caseData: [],
                drugData: [],
                combData: []
            }
        },

        created() {
            this.caseLoad()
            this.combLoad()
            this.drugLoad()
            this.bookLoad()
        },
        methods:{
            bookLoad() {
                request.get("http://localhost:8088/book/bookManagePage", {
                    params: {
                        pageNum: 1,
                        pageSize: 8,
                    }
                }).then(res => {
                    this.bookData = res.data.data
                })
            },
            caseLoad() {
                request.get("http://localhost:8088/case/caseManagePage", {
                    params: {
                        pageNum: 1,
                        pageSize: 8,
                    }
                }).then(res => {
                    console.log(res)
                    this.caseData = res.data.data
                })
            },
            combLoad() {
                request.get("http://localhost:8088/comb/combManagePage", {
                    params: {
                        pageNum: 1,
                        pageSize: 8,
                    }
                }).then(res => {
                    this.combData = res.data.data
                })
            },
            drugLoad() {
                request.get("http://localhost:8088/drug/drugManagePage", {
                    params: {
                        pageNum: 1,
                        pageSize: 8,
                    }
                }).then(res => {
                    this.drugData = res.data.data
                })
            },
            caseDetail(id) {
                localStorage.setItem("caseId",id)
                this.$router.push("/caseDetail")
            },
            bookDetail(id) {
                localStorage.setItem("bookId",id)
                this.$router.push("/bookDetail")
            },
            combDetail(id) {
                localStorage.setItem("combId",id)
                this.$router.push("/combDetail")
            },
            drugDetail(id) {
                localStorage.setItem("drugId",id)
                this.$router.push("/drugDetail")
            }
        }

    }
</script>

<style scoped>

</style>