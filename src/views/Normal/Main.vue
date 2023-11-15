<template>
    <div>
        <el-container style="min-height: 100vh; border: 1px solid #eee">
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>

                <el-row :gutter="20">
                    <el-col :span="4">
                        <div class="grid-content bg-aside" style="height: 900px">
                            <h1>热门收藏</h1>
                            <div>
                                <div style="margin-left: 10px" v-for="item in bookData">
                                    <el-button size="medium" type="text" @click="bookDetail(item.id.toString())">{{item.title}}</el-button>
                                </div>
                            </div>
                            <div>
                                <div style="margin-left: 10px" v-for="item in caseData">
                                    <el-button size="medium" type="text" @click="caseDetail(item.caseId.toString())">{{item.caseTitle}}</el-button>
                                </div>
                            </div>
                            <br><br><br><br>
                        </div>
                    </el-col>
                    <el-col :span="20">
                        <div class="grid-content bg-purple">
                            <router-view>

                            </router-view>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
           <el-footer>
               <Footer></Footer>
           </el-footer>
        </el-container>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    import request from "@/utils/request";
    export default {
        name: "Main",
        components:{
            Header,
            Footer
        },
        data(){
            return{
                bookData: [],
                caseData: [],
            }
        },

        created() {
            this.caseLoad()
            this.bookLoad()
        },
        methods:{
            bookLoad() {
                request.get("http://localhost:8088/book/moreCollect", {
                }).then(res => {
                    this.bookData = res.data.data
                })
            },
            caseLoad() {
                request.get("http://localhost:8088/case/moreCollect", {
                }).then(res => {
                    console.log(res)
                    this.caseData = res.data.data
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
        }

    }
</script>

<style scoped>
    .bg-purple {
        background: #fdf6f1;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .bg-aside{
        background-color: #fffeb0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        padding: 10px;
    }
</style>