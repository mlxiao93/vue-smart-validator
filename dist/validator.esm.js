var inBrowser = typeof window !== 'undefined';

var validatorDirective = {
    bind: function (el, binding, vnode, oldVnode) {
        console.log('hello');
    }
};

var Validator = (function () {
    function Validator() {
    }
    Validator.install = function (Vue) {
        Vue.directive('validator', validatorDirective);
    };
    return Validator;
}());
if (inBrowser && window.Vue) {
    window.Vue.use(Validator);
}

export default Validator;
