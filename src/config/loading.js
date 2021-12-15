import {Loading} from "element-ui";

/**
 * loading层 配合element Loading使用
 *   loading.close(); 关闭loading
 *   startLoading();开启
 */

export let loading;
export const startLoading = () => {  // 使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  });
};
