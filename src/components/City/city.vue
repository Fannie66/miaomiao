<template>
    <div class="city_container">
        <div class="city_list_hot">
            <Loading v-if="isLoading"/>
            <Scroller v-else ref="city_list">
                <div>
                    <!--热门城市部分-->
                    <div class="hotCity_container">
                        <h2 class="city_title">热门城市</h2>
                        <ul>
                            <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)"> {{item.nm}}</li>
                        </ul>
                    </div>
                    <!--城市列表部分-->
                    <div class="city_sort" ref="city_sort">
                        <div>
                            <div v-for="item in cityList" class="city_all">
                                <h2 class="city_title">{{item.index}}</h2>
                                <ul>
                                    <li v-for="i in item.list" :key="i.id" @tap="handleToCity(i.nm,i.id)">{{i.nm}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Scroller>
        </div>

        <!--城市索引部分-->
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" @touchstart="handleToIndex(index)">{{item.index}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "city",
        data(){
           return{
               cityList:[],
               hotList:[],
               isLoading:true
           }
        },
        mounted(){
            //获取本地存储中的数据
            var cityList = window.localStorage.getItem("cityList")
            var hotList = window.localStorage.getItem("hotList")
            // if判断本地是否存在数据
            if(cityList && hotList){
                this.cityList = JSON.parse(cityList)
                this.hotList = JSON.parse(hotList)
                this.isLoading = false
            }
            // 不存在：发起axios请求
            else{
                this.$axios.get("/api/cityList")
                    .then((res)=>{
                        var msg = res.data.msg;
                        if(msg === "ok"){
                            var cities = res.data.data.cities;
                            var {cityList,hotList} = this.formatCityList(cities)
                            this.cityList = cityList,
                            this.hotList = hotList
                            // 将城市缓存到本地存储中，可以减少axios的请求
                            //  本地存轴中只能存储字符串，所以要利用JSON.stringify（）将数据转换成字符串格式
                            // 数据提取时，再利用JSON.parse()转换成对象格式
                            window.localStorage.setItem("cityList",JSON.stringify(cityList))
                            window.localStorage.setItem("hotList",JSON.stringify(hotList))
                            // console.log(cities)
                        }
                    })
            }
        },
        methods:{
            formatCityList(cities){
                var cityList = []
                var hotList = []

                // 热门城市的数据处理
                for(var i=0;i<cities.length;i++){
                    if(cities[i].isHot == 1){
                        hotList.push(cities[i])
                        // console.log(11,hotList)
                    }
                }

                for(var i=0;i<cities.length;i++){
                    var firstLetter = cities[i].py.substring(0,1).toUpperCase()
                    // cityList里面没有该索引字母多的话，就新添加进cityList
                    if(toCom(firstLetter)){
                        cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]})
                    }
                    else{
                        // cityList里面已有该索引，就直接将城市信息push到list里面
                        for(var j=0;j<cityList.length;j++){
                            if(cityList[j].index === firstLetter){
                                cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
                            }
                        }
                    }
                }
                // 对索引字母进行排序
                cityList.sort((n,m)=>{
                    if(n.index>m.index){
                        return 1;
                    }
                    else if (n.index<m.index){
                        return -1;
                    }
                    else return 0;

                })

                // 判断cityList里面是否已有index，有的话，就不走这个判断；没有的话，就走下面的判断函数
                function toCom(firstLetter){
                    for(var i=0;i<cityList.length;i++){
                        if(cityList[i].index === firstLetter){
                            return false;
                        }
                    }
                    return true;
                }

                console.log(111,cityList)
                // console.log(333,hotList)

                // 将处理后的cityList和hotList返回
                return {
                    cityList,
                    hotList
                };

            },

            handleToIndex(index){
                var h2 = this.$refs.city_sort.getElementsByTagName('h2');
                // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
                // console.log(222,this.$refs.city_sort.parentNode)
                this.$refs.city_list.toScrollTop(-h2[index].offsetTop);

            },
            // 城市选择：点击哪个城市，当前定位就切换到哪个城市
            handleToCity(nm,id){
                this.$store.commit("CITY_INFO",{nm,id})
                // 当切换城市后，将其存储到本地中，这样刷新后就不会再返回到之前的城市了
                window.localStorage.setItem("newNm",nm)
                window.localStorage.setItem("newId",id)
                this.$router.push("/movie/nowPlaying")
            }
        }
    }
</script>

<style scoped>

</style>