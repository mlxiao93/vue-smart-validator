import validatorDirective from './validator.directive'
import Validators from "./validators";
import Options from './options'

export default class Index {
    install(Vue) {
        Vue.mixin({
            beforeCreate() {
                this.$validator = Validators.getInstance('default');
                this.$validator.options = function (opts) {
                    let options = Options.getInstance();
                    options.setLocal(opts);
                }
            }
        });
        Vue.directive('validator', validatorDirective)
    };
    constructor(opts) {
        let options = Options.getInstance();
        options.setGlobal(opts);
    };
}