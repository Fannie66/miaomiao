<template>
    <div class="movie_body">
        <Loading v-if="isLoading"/>
        <Scroller v-else>
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
        </Scroller>
    </div>
</template>

<script>
    export default {
        name: "comingSoon",
        data(){
            return{
                comingList:[],
                isLoading:true,
                preCityId:-1
            }
        },
        activated(){
            var cityId = this.$store.state.city.id
            if(this.preCityId === cityId) {return;}
            this.isLoading = true;
            this.$axios.get("/api/movieComingList?cityId=" +cityId)
                .then((data)=>{
                    var msg = data.data.msg
                    if(msg === "ok"){
                        var comingList = data.data.data.comingList
                        this.comingList = comingList
                        this.isLoading = false
                        this.preCityId = cityId
                        // console.log(111,comingList)
                    }
                })
        }
    }
</script>

<style scoped>

</style>