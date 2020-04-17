module.exports = {
    devServer:{
        open:true,// 是否自动打开
        host:"127.0.0.1",// 指定HOST
        port:8081,   //指定端口号
        proxy:{
            "/api":{// 当你访问的地址是以/api开头的话，就会使用该代理服务器
                target:"http://39.97.33.178",// 目标服务器即你要访问的链接地址 http://m.maoyan.com
                // http://m.maoyan.com/ajax/movieOnInfoList
                changeOrigin:true,// 是否允许代理
            }
        }
    }
}