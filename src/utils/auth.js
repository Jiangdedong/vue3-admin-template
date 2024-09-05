/**
 * @Description  : cookie操作
 * @Author       : 尾巴钓鱼的喵 1308242265@qq.com
 * @LastEditors  : 尾巴钓鱼的喵 1308242265@qq.com
 * @LastEditTime : 2024-09-05 15:28:35
 **/
import Cookies from 'js-cookie'

export function getCookie(key) {
	return Cookies.get(key)
}

export function setCookie(key, value) {
	return Cookies.set(key, value)
}

export function removeCookie(key) {
	return Cookies.remove(key)
}

const cookie = {
	getCookie,
	setCookie,
	removeCookie
}
export default cookie