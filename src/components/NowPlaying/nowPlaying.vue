<template>
    <div class="movie_body">
        <ul>
            <li v-for="item in movieList">
                <div class="pic_show"><img :src="item.img.replace('w.h','128.180')"/></div>
                <div class="info_list">
                    <h2>{{item.nm}}<img v-if="item.version" src="@/assets/maxs.png"/></h2>
                    <p>观众评<span class="grade">{{item.sc}}</span></p>
                    <p>主演:{{item.star}}</p>
                    <p>{{item.showInfo}}</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "nowPlaying",
        data(){
            return {
                movieList:[]
            }
        },
        mounted(){
            this.$axios.get("/api/movieOnInfoList?cityId=10")
                .then((data)=>{
                    var msg = data.data.msg
                    if(msg == "ok"){
                        var movieList = data.data.data.movieList
                        this.movieList = movieList
                    }
                    // console.log(2222,movieList)
                })
        }
    }
</script>

<style scoped>

</style>