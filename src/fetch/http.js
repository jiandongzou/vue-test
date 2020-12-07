import axios from 'axios'
import QS from 'qs'
import { Loading } from 'element-ui'
let loading;
let pending = [];
let CancelToken = axios.CancelToken
 
let cancelPending = (config) => {
  pending.forEach((item, index) => {
    if (config) {
      if (item.UrlPath === config.url) {
        item.Cancel("用户取消请求") // 取消请求
        pending.splice(index, 1) // 移除当前请求记录
      };
    } else {
      item.Cancel("用户取消请求") // 取消请求
      pending.splice(index, 1) // 移除当前请求记录
    }
  })
}
 
let startLoading = () => { // 使用Element loading-start 方法
  loading = Loading.service({
    fullscreen: true,
    lock: true,
    text: '加载中……',
     background: 'rgba(0, 0, 0, 0.7)'
  })
}
let endLoading = () => { // 使用Element loading-close 方法
  loading.close()

}


const instance = axios.create({
    // 设置超时时间 -30秒
    timeout: 30000,
    // 请求头部信息
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }  
})
instance.interceptors.request.use((config)=>{
    const token=localStorage.getItem("jwttoken");
    if(token){
        config.headers['token']=token
    }
   
    if(config.method=='get'){
        !config.params&&(configconfig.params={})
        config.params['_t']=new Date().getTime()
    }
    console.log(pending);
    cancelPending(config);
   
    config.cancelToken = new CancelToken(res => {
     
      pending.push({'UrlPath': config.url, 'Cancel': res})
    })
    startLoading();
   
   return  config;
});
instance.interceptors.response.use((response) => {
  endLoading();
  cancelPending(response.config);   
 return response
}, (err)=> {
  endLoading();
   if(err.response&&err.response.status===404){
   console.log('页面找不到');
    return Promise.resolve(response);
   }else{
      err.name="NetErr"
      return Promise.reject(err);
   }
 
});

export default{
    get(url, params){
     return  instance({
            url,
            method: 'get',
            params
        })
},

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