import {Validator} from "./validator";
import {isEmpty} from "./util/data";
import {options, rules} from "./param-parser";

export default class Validators {
    static instanceMap = {};
    static getInstance(uid): Validators {
        let instance = Validators.instanceMap[uid];
        if (!instance) instance = Validators.instanceMap[uid] = new Validators();
        return instance;
    }
    private validators:Array<{
        key: string | number
        group?: string,
        validator: Validator
    }> = [];

    private context: object;
    setContext(context) {
        !this.context && (this.context = context);
    }

    addValidator({ validator, options, vModelKey }) {
        this.validators.push({
            key: options.key || vModelKey,
            group: options.group,
            validator
        });
    }

    refresh({ rules, options }: { rules: rules, options: options}) {
        this.validators.map(({validator}) => {
            validator.refresh({ rules, options });
        })
    }

    check(index?: string|{ group: string }) {
        let { validators } = this;
        validators.map(({ key, group, validator }) => {
            if (index === undefined) {
                validator.check({ });
            } else if (typeof index === 'string') {
                if (index === key) validator.check({ });
            } else {
                if (index.group === group) validator.check({ });
            }
        });
        return this;
    }

    getError(index?: string|{ group: string }) {
        let { validators } = this;
        let error;
        validators.filter(({ key, group }) => {
            if (index === undefined) {
                return true;
            } else if (typeof index === 'string') {
                return index === key;
            } else {
                return index.group === group;
            }
        }).map(({ key, validator }) => {
            let _error = validator.getError();
            if (typeof index === 'string') {
                error = _error;
            } else {
                if (!isEmpty(_error)) {
                    error = error || {};
                    error[key] = _error;
                }
            }
        });
        return error;
    }

    firstError(index) {
        if (index === undefined) throw 'smart validator: method $validator.firstError needs a param';
        let error = this.getError(index);
        if (isEmpty(error)) return;
        let key = Object.keys(error).filter(item => typeof +item === 'number').sort()[0];
        return error[key];
    }
}