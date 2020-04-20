<template>
    <div class="content_container">
        <Top title="喵喵影院"/>
        <div class="main_body" id="content">
            <!--二级菜单区域-->
            <div class="cinema_menu">
                <div class="city_switch">
                    全城 <i class="iconfont icon-lower-triangle"></i>
                </div>
                <div class="brand_swtich">
                    品牌 <i class="iconfont icon-lower-triangle"></i>
                </div>
                <div class="feature_switch">
                    特色 <i class="iconfont icon-lower-triangle"></i>
                </div>
            </div>
            <!--影院主体区域-->
            <div class="cinema_body">
                <ul>
                    <li v-for="item in cinemas">
                        <div>
                            <span>{{item.nm}}</span>
                            <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
                        </div>
                        <div class="address">
                            <span>{{item.addr}}</span>
                            <span>{{item.distance}}</span>
                        </div>
                        <div class="card">
                            <div v-for="(num,key) in item.tag" v-if="num === 1" :key="key" :class="key | classCard">{{key | formatCard}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <Tabbar/>

    </div>
</template>

<script>
    import Top from "@/components/Top/top"
    import Tabbar from "@/components/TabBar/tabbar"

    export default {
        name: "cinema",
        components:{
            Top,
            Tabbar
        },
        data(){
            return{
                cinemas:[]
            }
        },
        mounted(){
            this.$axios.get("/api/cinemaList?cityId=10")
                .then((res)=>{
                    var msg = res.data.msg;
                    var cinemas = res.data.data.cinemas
                    if(msg == "ok"){
                        this.cinemas = cinemas
                    }
                    console.log(111,cinemas)
                })
        },
        filters:{
            formatCard(key){
                var card = [
                    {key:"allowRefund",value:"改签"},
                    {key:"endorse",value:"退"},
                    {key:"snack",value:"小吃"},
                    {key:"sell",value:"折扣卡"},
                ]
                for(var i =0;i<card.length;i++){
                    if(card[i].key === key){
                        return card[i].value
                    }
                }
            },
            classCard(key){
                var card = [
                    {key:"allowRefund",value:"bl"},
                    {key:"endorse",value:"bl"},
                    {key:"snack",value:"or"},
                    {key:"sell",value:"or"},
                ]
                for(var i =0;i<card.length;i++){
                    if(card[i].key === key){
                        return card[i].value
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>