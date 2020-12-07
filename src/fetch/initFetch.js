import axios from 'axios'
const CancelToken = axios.CancelToken
function addCancel(config, $this, cancel) {
    console.log( $this);
    if ($this) {
        config.CancelToken = new CancelToken(function executor(c) {
            $this[cancel] = c
        })
    }
}
 

    const instance = axios.create({
        // 设置超时时间 -30秒
        timeout: 30000,
        // 请求的baseUrl
        // 请求头部信息
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'jwttoken':localStorage.getItem("jwttoken")
        },
        // 修改请求数据
        transformRequest: [function (data, headers) {
            let ret = ''
            for (let it in data) {
                // 去除空字符串的请求字段
                if (data[it] !== '' && data[it] !== undefined) {
                    if (ret !== '') ret += '&'
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
                }
            }
            return ret
        }],
        // 跨域请求时允许携带凭证（cookie）
        withCredentials: process.env.NODE_ENV === 'production'
    })
 
   
    
 
   

function createAPI(url, method,token,data, $this, cancel) {
    let config = {
        method: method,
        url: url,
        data,
        headers:{
            token:token?token:null
        }
    };

    addCancel(config, $this, cancel)
    return instance(config)
}
const apis = {
    // 最新视频列表
    getData: (data, $this, cancel) => createAPI('https://www.fastmock.site/mock/a13f5eaa4bab21450fcfe73ae0a5a9cb/line/getData', 'get','', data, $this, cancel),
    
}
export default apis