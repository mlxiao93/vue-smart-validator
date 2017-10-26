/**
 * 判断值是否为空，定义为空的情况为：
 * 1. null
 * 2. undefined
 * 3. 空数组: []
 * 4. 只包含空格或者空字符串: ''或'  '
 * 5. 空对象：{}, 不考虑原型上的属性
 * @param val
 * @returns {boolean}
 */
export function isEmpty(val: any): boolean {
    if (val === undefined || val === null) return true;
    if (Array.isArray(val)) return val.length <= 0;
    if (typeof val === 'string') return val.trim() === '';
    if (JSON.stringify(val) === '{}') return true;
    return false;
}