<template>
    <div class="content_container">
        <Top title="我的喵喵"/>
        <div class="main_body">我的</div>
        <Tabbar/>
    </div>
</template>

<script>
    import Top from "@/components/Top/top"
    import Tabbar from "@/components/TabBar/tabbar"

    export default {
        name: "mine",
        components:{
            Top,
            Tabbar
        }
    }
</script>

<style scoped>

</style>