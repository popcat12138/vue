<template>
    <div>
        <div>
            <el-aside :width="isCollapse?'64px':'200px'" style="background-color: rgb(238, 241, 246);">
                <!--      "sideWidth+'px'"-->
                <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow"></Aside>
            </el-aside>

        </div>
        <h1>你好，这是一个测试页面****{{msg}}****{{userEntity.password}}</h1>
        <div>
<!--            <pdf src="http://localhost:8088/file/20230424210411_example.pdf"></pdf>-->
            <pdf v-for="i in pageNum" :key="i" :src="file" :page="i"></pdf>
            <img src="src/assets/logo.png" style="width:20px;position:relative;top:5px;margin-right: 5px">
        </div>
    </div>

</template>

<script>
    import request from "@/utils/request";
    import Aside from "@/components/Aside";
    import pdf from 'vue-pdf'

    export default {
        name: "Hello",
        components: {
            Aside,
            pdf
        },
        data(){
            return{
                msg: "测试",
                data:"error",
                userEntity:{},
                isCollapse:false,
                logoTextShow:true,
                file:"http://localhost:8088/file/20230424210411_example.pdf",
                pageNum:4
            }
        },
        created() {
            this.load()
            // this.getPageNum()
        },
        methods: {
            load(){
                request.get("/userAction/getUser/1").then(res=>{
                    console.log(res)

                    this.userEntity=res.data
                })
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
            },

            getPageNum () {
                let loadingTask = pdf.createLoadingTask(this.file)
                loadingTask.promise.then(pdf => {
                    this.pageNum = pdf.numPages
                }).catch(err => {
                    console.error('pdf加载失败', err);
                })
            },
            mounted(){
                this.getPageNum()
            }
        }
    }
</script>

<style scoped>

</style>