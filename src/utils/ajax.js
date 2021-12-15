/**
 * 封装能发ajax请求的函数 json格式转换为urlencode
 * 1. 解决了post请求携带参数的问题：默认是json格式，需要转换成urlencode格式。(使用请求拦截器进行操作)
 * 2. 让请求成功的结果不再是response，而是response.data 的数据
 * 3. 统一处理所有请求的异常错误
 */
import axios from 'axios';

/**
 * base_url： 主要数据请求的api
 */

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://49.233.14.172:8001/';

// 添加请求拦截器：让post请求的请求体格式为urlencoded格式  a=1&b=2
// 发请求前进行拦截
axios.interceptors.request.use(function(config) {
  // 得到请求方式和请求体数据

  const { method, data } = config;
  // 处理post请求，将data对象转换为query参数格式的字符串
  // config.headers.origin = 'http://49.233.14.172:7001';

  if (method.toLowerCase() === 'post' && typeof data === 'object') {
    // console.log(data)
    // config.data = qs.stringify(data)
  }

  return config;
});

// 添加响应拦截器：让响应过来的数据进行处理
// 让请求成功的结果不再是response，而是response.data的数-据
// 在我们请求数据响应数据的回调函数之前
axios.interceptors.response.use(
  function(response) {
    setTimeout(() => {}, 200);
    // 操作vuex数据
    return response; // 这个返回的数据结果就会返回到我们请求响应的回调函数的结果
  },
  function(error) {
    // 统一处理所有请求异常错误
    // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
    setTimeout(() => {}, 200);
    // 路由拦截 跳转404
    // window.location.href = "/404"
    this.$toast.error(`'请求出错' + ${error.message}`);

    return new Promise(() => {});
  }
);

export default axios;
