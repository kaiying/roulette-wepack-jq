// 2019-02-14T08:00:00.000+08:00
export default d => (typeof d === 'undefined' ? '' : new Date(d).toLocaleDateString());

/**
 * 取得Ｎ小時後時間
 * @param {number} hour 小時
 * @return {Date}
 */
export const inFifteenHours = (hour = 1) => new Date(new Date().getTime() + hour * 60 * 60 * 1000);

