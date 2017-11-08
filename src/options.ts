import {isNullOrUndefined} from "./util/data";
import { isEmpty } from './util/data';

export default class Options {
    static instance = new Options();
    static getInstance() {
        return Options.instance;
    }

    private defaults = {
        trigger: 'blur',
        rules: {
            required (value) {
                return !isEmpty(value);
            },
            number (value) {
                return /^\d*$/.test(value);
            }
        }
    };

    private global:any = {};
    private local:any = {};

    public setGlobal(option = {}) {
        this.global = option
    }

    public setLocal(option = {}) {
        this.local = option;
    }

    public getOptions():any {
        let { defaults, global, local } = this;
        let options = {};
        Object.keys(defaults).map(key => {
            let defaultVal = defaults[key];
            let globalVal = global[key];
            let localVal = local[key];

            if (toString.call(defaultVal) === '[object Object]') {
                options[key] = {
                    ...defaultVal,
                    ...(globalVal || {}),
                    ...(localVal || {})
                };
            } else if (toString.call(defaultVal) === '[object Array]') {
                options[key] = [
                    ...defaultVal,
                    ...(globalVal || {}),
                    ...(localVal || {})
                ];
            } else {
                options[key] = (!isNullOrUndefined(localVal) && localVal) ||
                    (!isNullOrUndefined(globalVal) && globalVal) ||
                    (!isNullOrUndefined(defaultVal) && defaultVal);
            }
        });

        return options;
    }
}