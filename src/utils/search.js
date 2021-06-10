// 存储localstorage
export const setLocalStorage = (name, content) => {
  content = JSON.stringify(content)
  window.localStorage.setItem(name, content)
}

// 获取localstorage
export const getLocalStorage = name => {
  return window.localStorage.getItem(name)
}
// 清空localstorage
export const removeLocalStorage = name => {
  window.localStorage.removeItem(name)
}
