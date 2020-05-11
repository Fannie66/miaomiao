<template>
    <div class="movie_body" ref="movie_body">
        <Loading v-if="isLoading"/>
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <li class="pullDown">{{pullDown}}</li>
                <li v-for="item in movieList">
                    <div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img.replace('w.h','128.180')"/></div>
                    <div class="info_list">
                        <h2 @tap="handleToDetail(item.id)" >{{item.nm}}<img v-if="item.version" src="@/assets/maxs.png"/></h2>
                        <p>观众评<span class="grade">{{item.sc}}</span></p>
                        <p>主演:{{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>

    import Loading from "../Loading/loading";
    export default {
        name: "nowPlaying",
        components: {Loading},
        data(){
            return {
                movieList:[],
                pullDown:"",
                isLoading:true,
                preCityId : -1,
            }
        },
        activated(){
            // 当城市发生切换时，电影的相关数据也应该发生变化，需要重新请求数据
            // 当定位城市不变，则不需要重新发起请求，只需要用到缓存的数据即可
            var cityId = this.$store.state.city.id
            if(this.preCityId === cityId) {return;}
            this.isLoading = true;
            // console.log(123)
            this.$axios.get("/api/movieOnInfoList?cityId=" +cityId)
                .then((data)=>{
                    var msg = data.data.msg
                    if(msg == "ok"){
                        var movieList = data.data.data.movieList
                        this.movieList = movieList
                        this.isLoading = false
                        this.preCityId = cityId
                        // this.$nextTick(()=>{
                        //     var scroll = new BScroll(this.$refs.movie_body,{
                        //         tap:true,
                        //         probeType:1
                        //     })
                        //     scroll.on('scroll',(pos)=>{
                        //         if(pos.y > 30){
                        //             this.pullDown="正在更新中..."
                        //         }
                        //     })
                        //
                        //     scroll.on('touchEnd',(pos)=>{
                        //         if(pos.y > 30){
                        //             this.$axios.get("/api/movieOnInfoList?cityId=14").then(()=>{
                        //                 var msg = data.data.msg
                        //                 if(msg == "ok"){
                        //                     this.pullDown="更新完成"
                        //                     setTimeout(()=>{
                        //                         this.movieList = data.data.data.movieList
                        //                         this.pullDown=""
                        //                     },1000)
                        //                 }
                        //             })
                        //         }
                        //     })
                        // })
                    }
                    // console.log(2222,movieList)
                })
        },
        methods:{
            handleToDetail(movieId){
                console.log(movieId)
                this.$router.push("/movie/detail/1/"+movieId)
            },
            handleToScroll(pos){
                if(pos.y > 30){
                    this.pullDown="正在更新中..."
                }
            },
            handleToTouchEnd(pos){
                if(pos.y > 30){
                    this.$axios.get("/api/movieOnInfoList?cityId=14").then(()=>{
                        var msg = data.data.msg
                        if(msg == "ok"){
                            this.pullDown="更新完成"
                            setTimeout(()=>{
                                this.movieList = data.data.data.movieList
                                this.pullDown=""

                            },1000)
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>