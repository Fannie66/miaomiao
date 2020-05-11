// import Movie from "@/views/Movie/movie"
// export default [
//     {
//         name:"Movie",
//         path:"/movie",
//         component:Movie
//     }
// ]

export default {
    path: "/movie",
    component: () => import("@/views/Movie/movie"),
    children:[
        {
            path:"city",
            component: () => import("@/components/City/city"),
        },
        {
            path:"search",
            component: () => import("@/components/Search/search"),
        },
        {
            path:"nowPlaying",
            component: () => import("@/components/NowPlaying/nowPlaying"),
        },
        {
            path:"comingSoon",
            component: () => import("@/components/ComingSoon/comingSoon"),
        },
        {
            path:"detail/1/:movieId",
            components: {
                // default:()=>import ("@/components/NowPlaying/nowPlaying"),
                detail:()=>import ("@/views/Movie/detail")
            },
            props:{
                detail:true
            }
        },
        {
            path:"detail/2/:movieId",
            components: {
                // default:()=>import ("@/components/ComingSoon/comingSoon"),
                detail:()=>import ("@/views/Movie/detail")
            },
            props:{
                detail:true
            }
        },
        {
            path:"/movie",
            redirect:"/movie/nowPlaying"
        }
    ]
}