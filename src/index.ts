import validatorDirective from './validator.directive'
import Validators from "./validators"
import Options from './options'

export default class Index {
    install(Vue) {
        Vue.mixin({
            beforeCreate() {
                this.$validator = Validators.getInstance('default');
                this.$validator.options = (opts) => {
                    Options.getInstance().setLocal(opts);
                    this.$validatorLocalOptionsHasSet = true;
                }
            },
            destroyed () {
                if (this.$validatorLocalOptionsHasSet) {
                    Options.getInstance().resetLocal();
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