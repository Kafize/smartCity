
const baseUrl = 'http://124.93.196.45:10001/';
const request = (options = {}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl+options.url || '',
            method:options.type || 'GET' ,
            data: options.data || {},
            header:{Authorization:uni.getStorageSync('token')} || {}
        }).then((response) => {
            resolve(response.data);
        }).catch(error => {
			console.log(baseUrl+options.url)
			console.log(error)
            reject(error)
        })
    });
}
const get=(url,data,options={})=>{
    options.type='get';
    options.data = data;
    options.url = url;
    return request(options)
}
const post = (url, data, options = {}) => {
    options.type = 'post';
    options.data = data;
    options.url = url;
    return request(options)
}
const put = (url, data, options = {}) => {
    options.type = 'put';
    options.data = data;
    options.url = url;
    return request(options)
}
const del = (url, data, options = {}) => {
    options.type = 'delete';
    options.data = data;
    options.url = url;
    return request(options)
}
export default {
    request,
    get,
    post,
    put,
	del,
    baseUrl
}
