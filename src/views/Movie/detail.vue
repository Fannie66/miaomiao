<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <Loading v-if="isLoading" />
        <div v-else id="content" class="contentDetail">
            <div class="detail_list">
                <div class="detail_list_bg" :style="{ 'background-image' : 'url('+ detailMovie.img +')' }"></div>
                <div class="detail_list_filter"></div>
                <div class="detail_list_content">
                    <div class="detail_list_img">

                    </div>
                    <div class="detail_list_info">
                        <h2>{{ detailMovie.nm }}</h2>
                        <p>{{ detailMovie.enm }}</p>
                        <p>{{ detailMovie.sc }}</p>
                        <p>{{ detailMovie.cat }}</p>
                        <p>{{ detailMovie.src }} / {{ detailMovie.dur }}分钟</p>
                        <p>{{ detailMovie.pubDesc }}</p>
                    </div>
                </div>
            </div>
            <div class="detail_intro">
                <p>
                    {{ detailMovie.dra }}
                </p>
            </div>
            <div class="detail_player swiper-container" ref="detail_player">
                <ul class="swiper-wrapper">
                    <li v-for="(item,index) in detailMovie.photos" :key="index" class="swiper-slide">
                        <div>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Top from "@/components/Top/top"


    export default {
        name: "detail",
        data(){
            return{
                detailMovie:[],
                isLoading:true
            }
        },
        components:{
            Top,
        },

        props:["movieId"],
        mounted(){
            this.$axios.get("/api/detailmovie?movieId="+this.movieId)
                .then((data)=>{
                    let msg = data.data.msg
                    if(msg == "ok"){
                        this.isLoading = false
                        this.detailList = data.data.data.detailMovie
                        this.$nextTick(()=>{
                            new Swiper (this.$refs.detail_player , {
                                slidesPerView : 'auto',
                                freeMode : true,
                                freeModeSticky: true
                            });
                        })
                    }
                    console.log(111,this.detailList)
                })
            // console.log(999,this.movieId)
        },
        methods : {
            handleToBack(){
                this.$router.back();
            }
        },
    }
</script>

<style scoped>

</style>