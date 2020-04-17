// 这种方式路由合并时，可以用扩展运算符的方式
// import Cinema from "@/views/Cinema/cinema"
// export default [
//     {
//         name:"Cinema",
//         path:"/Cinema",
//         component:Cinema
//     }
// ]


// 这种方式配置的路由，进行路由合并时，不能用扩展运算符的形式
export default {
    path: "/cinema",
    component: () => import("@/views/Cinema/cinema")
}


