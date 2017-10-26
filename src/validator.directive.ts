import rules from './rules'

export default {
    bind (el, binding, vnode, oldVnode) {
        el.addEventListener('blur', () => {
            let message = rules.required({value: el.value});
            if (message) {
                console.error(message)
            } else {
                console.log('OK');
            }
        })
    }
}