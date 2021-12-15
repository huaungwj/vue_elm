/**
 * 封装三个存储localstorage的函数
 */

//存储localstorage
export const setStore = (key, contents)=>{
  if (!key) return;
  if (typeof contents !== String){
    contents = JSON.stringify(contents)
  }
  window.localStorage.setItem(key, contents)
};

/*读取指定的localstorage*/
export const getStore = (key) =>{
  if (!key) return;
  return window.localStorage.getItem(key)
};

/*删除指定的localstorage*/
export const removeStore = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key)
};
