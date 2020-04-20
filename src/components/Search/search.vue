<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model="message">
            </div>
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="item in movieList">
                    <!--<div class="img"><img :src="item.img.replace('w.h','128.180')"/></div>-->
                    <div class="info">
                        <p><span>{{item.nm}}</span><span>{{item.sc}}</span></p>
                        <p>{{item.enm}}</p>
                        <p>{{item.cat}}</p>
                        <p>{{item.rt}}</p>
                    </div>
                </li>
                <li v-for="item in cinemasList" class="cinemas_li">
                    <!--<div class="img"><img :src="item.img.replace('w.h','128.180')"/></div>-->
                    <div class="info cinemas_info">
                        <p class="cinames_nm"><span>{{item.nm}}</span></p>
                        <p>{{item.addr}}</p>
                        <p>距离{{item.distance}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",
        data(){
            return{
                message:"",
                movieList:[],
                cinemasList:[]
            }
        },
        methods:{
            cancelRequest(){
                if(typeof this.source ==='function'){
                    this.source('终止请求')
                }
            }
        },
        watch:{
            message(newVal){
                var that = this;
                // 取消上一次请求
                this.cancelRequest();

                that.$axios.get("/api/searchList?cityId=10&kw=" +newVal,{
                    cancelToken: new that.$axios.CancelToken(function(c) {
                        that.source = c;
                    })
                })
                    .then((data)=>{
                        var msg = data.data.msg;
                        var movies = data.data.data.movies;
                        var cinemas = data.data.data.cinemas;
                        if(msg && movies){
                            this.movieList = movies.list
                        }
                        if(msg && cinemas)
                            this.cinemasList = cinemas.list
                        // console.log(555,this.movieList)
                        // console.log(999,this.cinemasList)
                        console.log(666,newVal)
                    }).catch((err) => {
                    if (that.$axios.isCancel(err)) {
                        console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
                    } else {
                        //handle error
                        console.log(err);
                    }
                })
            }
        }

    }
</script>

<style scoped>

</style>