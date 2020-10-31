import { split, join, remove } from 'ramda';
import Cookies from 'js-cookie';
import { inFifteenHours } from '@/src/helper/date';

const getFatherDomain = () => {
  let domain = split('.', document.domain);
  domain = remove(0, 1, domain);
  return join('.', domain);
};

/**
 * default cookie options
 * @type {{path: string, expires: number, domain: any, sameSite: string, Secure: boolean}}
 */
const cookieOption = { expires: inFifteenHours(1), path: '/', domain: getFatherDomain(), sameSite: 'strict', Secure: true };

/**
 * 設定 cookie
 * @param {string} name cookie 名稱
 * @param {any} value cookie 值
 * @param {number} hour cookie 存留時間(分鐘)
 * @return {string} cookie
 */
export const setCookie = (name, value, hour = 1) => Cookies.set(name, value, { ...cookieOption, expires: inFifteenHours(hour) });

/**
 * get cookie
 * @param {string} cookieName cookie name
 * @return {*}
 */
export const getCookie = (cookieName) => Cookies.get(cookieName, { path: cookieOption.path });

/**
 * remove cookie
 * @param {string} cookieName cookie name
 * @return {*}
 */
export const removeCookie = (cookieName) => Cookies.remove(cookieName, { path: cookieOption.path });

/**
 * 移除所有 cookie
 * 會包含所有登入狀態及 tracking code
 */
export const removeAllCookie = () => Object.keys(Cookies.get()).forEach((cookieName) => Cookies.remove(cookieName));
