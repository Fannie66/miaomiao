// import Mine from "@/views/Mine/mine"
// export default [
//     {
//         name:"Mine",
//         path:"/mine",
//         component:Mine
//     }
// ]


export default {
    path: "/mine",
    component: () => import("@/views/Mine/mine")
}