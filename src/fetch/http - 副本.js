import axios from 'axios'
import QS from 'qs'
// 正在进行中的请求列表
let reqList = []

/**
 * 阻止重复请求
 * @param {array} reqList - 请求缓存列表
 * @param {string} url - 当前请求地址
 * @param {function} cancel - 请求中断函数
 * @param {string} errorMessage - 请求中断时需要显示的错误信息
 */
const stopRepeatRequest = function (reqList, url, cancel, errorMessage) {
  const errorMsg = errorMessage || ''
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      cancel(errorMsg)
      return
    }
  }
  reqList.push(url)
}

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} url 请求地址
 */
const allowRequest = function (reqList, url) {
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      reqList.splice(i, 1)
      break
    }
  }
}
const instance = axios.create({
    // 设置超时时间 -30秒
    timeout: 30000,
    // 请求头部信息
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
   
})
// object对象存放每次new CancelToken生成的方法
let source = {}

// 每次请求前都会把api放在此数组中，响应成功后清除此请求api
let requestList = []
instance.interceptors.request.use((config)=>{
    const token=localStorage.getItem("jwttoken");
    let cancel
  	// 设置cancelToken对象
    config.cancelToken = new axios.CancelToken(function(c) {
        console.log(c);
    	cancel = c
    })
    // 阻止重复请求。当上个请求未完成时，相同的请求不会进行
    stopRepeatRequest(reqList, config.url, cancel, `${config.url} 请求被中断`);
    if(token){
        config.headers['token']=token
    }
   
    if(config.method=='get'){
        !config.params&&(configconfig.params={})
        config.params['_t']=new Date().getTime()
    }

   return  config;
});
instance.interceptors.response.use((response) => {
    setTimeout(() => {
        allowRequest(reqList, response.config.url)
      }, 1000)
 return response
}, (err)=> {
    if (axios.isCancel(err)) {
        console.log(err.message);
      } else {
        // 增加延迟，相同请求不得在短时间内重复发送
        setTimeout(() => {
          allowRequest(reqList, error.config.url)
        }, 1000)
    }     
//    if(err.response&&err.response.status===404){
//     alert('页面找不到');
//     return Promise.resolve(response);
//    }else{
//       err.name="NetErr"
//       return Promise.reject(err);
//    }
});
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export default{
    get(url, params){
     return  instance({
            url,
            method: 'get',
            params
        })
  
},
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
  post(url, params) { 
    return instance({
            url,
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            params:QS.stringify(params)
        })
 }
}