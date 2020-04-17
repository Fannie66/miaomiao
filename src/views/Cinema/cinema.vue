<template>
    <div class="content_container">
        <Top title="喵喵影院"/>
        <div class="main_body">影院</div>
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
        }
    }
</script>

<style scoped>

</style>