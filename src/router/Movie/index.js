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
            path:"/movie",
            redirect:"/movie/nowPlaying"
        }
    ]
}