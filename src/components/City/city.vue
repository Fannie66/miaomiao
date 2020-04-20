<template>
    <div class="city_container">
        <div class="city_list_hot">
            <!--热门城市部分-->
            <div class="hotCity_container">
                <h2 class="city_title">热门城市</h2>
                <ul>
                    <li v-for="item in hotList"> {{item.nm}}</li>
                </ul>
            </div>
            <!--城市列表部分-->
            <div class="city_sort" ref="city_sort">
                <div>
                    <div v-for="item in cityList" class="city_all">
                        <h2 class="city_title">{{item.index}}</h2>
                        <ul>
                            <li v-for="i in item.list">{{i.nm}}</li>
                        </ul>
                    </div>
                </div>
            </div>
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
               hotList:[]
           }
        },
        mounted(){
            this.$axios.get("/api/cityList")
                .then((res)=>{
                    var msg = res.data.msg;
                    if(msg === "ok"){
                        var cities = res.data.data.cities;
                        var {cityList,hotList} = this.formatCityList(cities)
                        this.cityList = cityList,
                        this.hotList = hotList
                        // console.log(cities)
                    }
                })
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
                this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
                console.log(222,this.$refs.city_sort.parentNode)
            }
        }
    }
</script>

<style scoped>

</style>