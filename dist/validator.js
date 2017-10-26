(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Validator = factory());
}(this, (function () { 'use strict';

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

return Validator;

})));
