import http from './http'
const api={
    getData(data){
       return http.get("https://mock.yonyoucloud.com/mock/7509/laoke/user",data={})
    }
}
export default api;