<template>
    <div class="city_container">
        <div class="hotCity_container">
            <h2>热门城市</h2>
            <ul>
                <li v-for="item in hotList"> {{item.nm}}</li>
            </ul>
        </div>
        <div class="cityList_container">
            <div class="city_list" ref="cityList_sort">
                <div v-for="item in cityList">
                    <h2>{{item.index}}</h2>
                    <ul>
                        <li v-for="i in item.list">{{i.nm}}</li>
                    </ul>
                </div>
            </div>
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
                    let msg = res.data.msg;
                    if(msg === "ok"){
                        let cities = res.data.data.cities;
                        let {cityList,hotList} = this.formatCityList(cities)
                        this.cityList = cityList,
                        this.hotList = hotList
                        // console.log(cities)
                    }
                })
        },
        methods:{
            formatCityList(cities){
                let cityList = []
                let hotList = []

                // 热门城市的数据处理
                for(let i=0;i<cities.length;i++){
                    if(cities[i].isHot == 1){
                        hotList.push(cities[i])
                        // console.log(11,hotList)
                    }
                }

                for(let i=0;i<cities.length;i++){
                    let firstLetter = cities[i].py.substring(0,1).toUpperCase()
                    if(toCom(firstLetter)){
                        cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]})
                    }
                    else{
                        for(let j=0;j<citiList.length;j++){
                            cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
                        }
                    }
                }

                cityList.sort((n,m)=>{
                    if(n.index>m.index){
                        return 1;
                    }
                    else if (n.index<m.index){
                        return -1;
                    }
                    else return 0;

                })

                function toCom(firstLetter){
                    for(let i=0;i<cities.length;i++){
                        if(cities[i].index == firstLetter){
                            return false;
                        }
                        return true;
                    }
                }

                console.log(cityList)

                return {
                    cityList,
                    hotList
                };

            }
        }
    }
</script>

<style scoped>

</style>