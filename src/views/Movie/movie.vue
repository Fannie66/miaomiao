<template>
    <div class="content_container">
        <!--头部信息-->
        <Top title="喵喵电影"/>
        <!--内容区域-->
        <div class="main_body" id="content">
            <!--二级菜单部分-->
            <div class="main_menu">
                <!--城市按钮-->
                <router-link tag="div" class="menu_city" to="/movie/city">
                    <span>北京</span>
                    <i class="triangle"></i>
                </router-link>
                <!--热映/上映部分-->
                <div class="hot_switch">
                    <router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
                    <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
                </div>
                <!--搜索部分-->
                <router-link tag="div" class="search_entry" to="/movie/search">
                    <i class="iconfont icon-sousuo"></i>
                </router-link>
            </div>

            <!--使用<keep-alive>可以提高性能，浏览器可以将一部分内容进行缓存-->
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
        <!--底部tabbar-->
        <Tabbar/>
    </div>
</template>

<script>
    import Top from "@/components/Top/top"
    import Tabbar from "@/components/TabBar/tabbar"


    export default {
        name: "movie",
        components:{
            Top,
            Tabbar
        }
    }
</script>

<style scoped>

</style>