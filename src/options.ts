import {isNullOrUndefined} from "./util/data";
import { isEmpty } from './util/data';
import * as rules from './rules/index'
import messages from './rules/messages'

export default class Options {
    static instance = new Options();
    static getInstance() {
        return Options.instance;
    }

    private defaults = {
        trigger: 'change',
        rules,
        messages,
        appendErrorTip: false
    };

    private global:any = {};
    private local:any = {};

    public setGlobal(option = {}) {
        this.global = option
    }

    public setLocal(option = {}) {
        this.local = option;
    }

    public resetLocal() {
        this.local = isEmpty(this.global) ? this.defaults : this.global;
    }

    public getOptions(directiveOptions?:any):any {
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
            }
            // else if (toString.call(defaultVal) === '[object Array]') {
            //     options[key] = [
            //         ...defaultVal,
            //         ...(globalVal || {}),
            //         ...(localVal || {})
            //     ];
            // }
            else {
                options[key] = defaultVal;
                if (!isNullOrUndefined(localVal)) {
                    options[key] = localVal;
                } else if (!isNullOrUndefined(globalVal)) {
                    options[key] = globalVal
                }

            }
        });

        if (directiveOptions) {
            Object.keys(directiveOptions).map(key => {
                if (key === 'rules') return;
                let val = directiveOptions[key];
                if (toString.call(val) === '[object Object]') {
                    options[key] = {
                        ...options[key],
                        ...val
                    }
                } else {
                    options[key] = val;
                }
            })
        }

        return options;
    }
}