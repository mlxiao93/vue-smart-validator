import { rules, options } from './param-parser'
import { Rule } from "./rule";
import Options from "./options";
import {isEmpty} from "./util/data";
import {appendErrorEl, insertAfter, removeErrorEl} from "./util/dom";

export class Validator {

    vModelKey;
    errorEl: HTMLElement;
    targetEl: HTMLElement;
    options;

    private validators: Array<{
        index: number,
        key?: string
        check: Function,
        trigger: string,
        errorMessage?: string
    }> = [];

    context: any;
    vnode: any;

    private setValidators({ rules, options }: { rules: rules, options: options}) {
        let _validator = [];
        rules.map(({ key, modifies, message, trigger }, index) => {
            let rule = Rule.getRule(key);
            if (!rule) return console.error(`smart validator: rule '${key}' do not exists`);
            let _trigger = trigger || options.trigger || Options.getInstance().getOptions().trigger;

            if (toString.call(key) === '[object String]') {
                message = message || Options.getInstance().getOptions().messages[<string>key];
            }

            _validator.push({
                index,
                key: typeof key === 'string' ? key : undefined,
                check: (message => {
                    return modelValue => {
                        if (!rule(modelValue, modifies)) {
                            if (typeof message === 'function') return message(modelValue, modifies);
                            return message || 'message not set';
                        }
                    }
                })(message),
                trigger: _trigger,
                errorMessage: this.validators[index] && this.validators[index].errorMessage
            })
        });
        this.validators = _validator;
    }

    getExistsTriggers() {
        let triggerObj = {};
        this.validators.map(item => triggerObj[item.trigger] = true);
        return Object.keys(triggerObj);
    }

    check({ trigger }: { trigger?: string }) {
        let { validators, context, errorEl, vModelKey, vnode } = this;

        let model = vnode.data.directives.filter(item => item.name === 'model')[0] || vnode.data.model;
        let modelValue = model.value;

        let options = Options.getInstance().getOptions(this.options);

        // if (trigger === 'change') {   // change时，先清空错误信息
        //     this.validators.map(validator => validator.errorMessage = '');
        // }

        for (let validator of validators) {
            if (trigger) {
                (validator.trigger === trigger) && (validator.errorMessage = validator.check(modelValue));
            } else {
                validator.errorMessage = validator.check(modelValue);
            }

            if (options.nullable && validator.key !== 'required' && (modelValue === '' || modelValue === undefined)) {
                validator.errorMessage = '';
            }
        }
        let message = this.firstError();

        if (message) {
            errorEl.classList.add('validator-has-error');
            errorEl.setAttribute('data-validator-error', message);

            if (options.appenderrortip) {
                appendErrorEl(errorEl, message);
            }

        } else {
            errorEl.classList.remove('validator-has-error');
            errorEl.removeAttribute('data-validator-error');
            removeErrorEl(errorEl);
        }
        context.$forceUpdate();
        return this;
    }

    getError() {
        let error = {};
        this.validators.filter(({ errorMessage }) => {
            return errorMessage;
        }).map(({ index, key, errorMessage }) => {
            if (key) error[key] = errorMessage;
            error[index] = errorMessage;
        });
        return error;
    }

    firstError() {
        let error = this.getError();
        if (isEmpty(error)) return;
        let key = Object.keys(error).filter(item => typeof +item === 'number').sort()[0];
        return error[key];
    }

    constructor({ rules, options, vModelKey, context, errorEl, targetEl, vnode }) {
        this.targetEl = targetEl;
        this.errorEl = errorEl;
        this.vModelKey = vModelKey;
        this.context = context;
        this.vnode = vnode;
        this.options = options;
        this.setValidators({ rules, options })
    }

    refresh({ rules, options, context, vnode }) {
        this.options = options;
        this.context = context;
        this.vnode = vnode;
        this.setValidators({ rules, options });
    }
}