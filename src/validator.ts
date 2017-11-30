import { rules, options } from './param-parser'
import { Rule } from "./rule";
import Options from "./options";
import {isEmpty} from "./util/data";
import scopedEval from './util/scoped-eval'
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

    private setValidators({ rules, options }: { rules: rules, options: options}) {
        this.validators = [];
        let { validators, errorEl } = this;
        rules.map(({ key, modifies, message, trigger }, index) => {
            let rule = Rule.getRule(key);
            if (!rule) return console.error(`smart validator: rule '${key}' do not exists`);
            let _trigger = trigger || options.trigger || Options.getInstance().getOptions().trigger;

            if (toString.call(key) === '[object String]') {
                message = message || Options.getInstance().getOptions().messages[<string>key];
            }

            validators.push({
                index,
                key: typeof key === 'string' ? key : undefined,
                check: (message => {
                    return modelValue => {
                        if (!rule(modelValue, modifies)) return message || 'message not set';
                    }
                })(message),
                trigger: _trigger
            })
        })
    }

    getExistsTriggers() {
        let triggerObj = {};
        this.validators.map(item => triggerObj[item.trigger] = true);
        return Object.keys(triggerObj);
    }

    check({ trigger }: { trigger?: string }) {
        let { validators, context, errorEl, vModelKey } = this;
        let modelValue = scopedEval(vModelKey, context);
        for (let validator of validators) {
            if (trigger) {
                (validator.trigger === trigger) && (validator.errorMessage = validator.check(modelValue));
            } else {
                validator.errorMessage = validator.check(modelValue);
            }
        }
        let message = this.firstError();

        let options = Options.getInstance().getOptions(this.options);

        if (message) {
            errorEl.classList.add('validator-has-error');
            errorEl.setAttribute('data-validator-error', message);

            if (options.appendErrorTip) {
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

    constructor({ rules, options, vModelKey, context, errorEl, targetEl }: { rules: rules, options: options, vModelKey: string, context: object, errorEl: HTMLElement, targetEl: HTMLElement }) {
        this.targetEl = targetEl;
        this.errorEl = errorEl;
        this.vModelKey = vModelKey;
        this.context = context;
        this.options = options;
        this.setValidators({ rules, options })
    }

    refresh({ rules, options }: { rules: rules, options: options}) {
        this.options = options;
        this.setValidators({ rules, options });
    }
}