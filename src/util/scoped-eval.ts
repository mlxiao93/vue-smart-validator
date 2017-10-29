/**
 * @param expression 表达式 eg: a + b
 * @param scope eval函数执行上下文 eg: {a: 1, b: 2}
 * @returns {any}  表达式返回值 eg: 3
 */
export default function (expression, scope) {
    let keys = Object.keys(scope);
    let values = keys.map(key => scope[key]);
    return Function(...keys, `return ${expression}`).apply(scope, values);
}