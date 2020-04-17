<template>
    <div class="header_container">
        <h2 class="header_title">{{title}}</h2>
    </div>
</template>

<script>
    export default {
        name: "top",
        props:{
            title:{
                type:String,
                default:"喵喵电影"
            }
        }
    }
</script>

<style scoped>


</style>S