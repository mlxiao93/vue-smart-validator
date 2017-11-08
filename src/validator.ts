import { rules, options } from './param-parser'
import { Rule } from "./rule";
import Options from "./options";

export class Validator {

    vModelKey;

    private validators: Array<{
        index: number,
        key?: string
        check: Function,
        trigger: string,
        errorMessage?: string
    }> = [];

    private context: any;

    private setValidators({ rules, options }: { rules: rules, options: options}) {
        let { validators } = this;
        rules.map(({ key, modifies, message, trigger }, index) => {
            let rule = Rule.getRule(key);
            if (!rule) return console.error(`smart validator: rule '${key}' do not exists`);
            let _trigger = trigger || options.trigger || Options.getInstance().getOptions().trigger;
            validators.push({
                index,
                key: typeof key === 'string' ? key : undefined,
                check: (message => {
                    return modelValue => {
                        if (!rule(modelValue, modifies)) return message;
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

    check({ modelValue, trigger }: { modelValue: any, trigger?: string }) {
        let { validators, context } = this;
        for (let validator of validators) {
            if (trigger) {
                (validator.trigger === trigger) && (validator.errorMessage = validator.check(modelValue));
            } else {
                validator.errorMessage = validator.check(modelValue);
            }
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

    constructor({ rules, options, vModelKey, context }: { rules: rules, options: options, vModelKey: string, context: object }) {
        this.vModelKey = vModelKey;
        this.context = context;
        this.setValidators({ rules, options })
    }
}