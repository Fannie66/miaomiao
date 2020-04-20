<template>
    <div class="movie_body">
        <ul>
            <li v-for="item in comingList">
                <div class="pic_show"><img :src="item.img.replace('w.h','128.180')"/></div>
                <div class="info_list">
                    <h2>{{item.nm}}<img v-if="item.version" src="@/assets/maxs.png"/></h2>
                    <p><span class="person">{{item.wish}}</span>人想看</p>
                    <p>主演:{{item.star}}</p>
                    <p>{{item.rt}}上映</p>
                </div>
                <div class="btn_mall">
                    预售
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "comingSoon",
        data(){
            return{
                comingList:[]
            }
        },
        mounted(){
            this.$axios.get("/api/movieComingList?cityId=10")
                .then((data)=>{
                    var msg = data.data.msg
                    if(msg === "ok"){
                        var comingList = data.data.data.comingList
                        this.comingList = comingList
                        console.log(111,comingList)
                    }
                })
        }
    }
</script>

<style scoped>

</style>