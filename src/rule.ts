/**
 * 校验规则
 */

import { isEmpty } from './util/data';

export class Rule {
    static rules = {
        required (value, message = 'can not be empty') {
            if (isEmpty(value)) {
                return message;
            }
        },
        number (value, message = 'must be numbers') {
            if (!/^\d*$/.test(value)) {
                return message;
            }
        }
    };

    static extendRules(rules = {}) {
        Rule.rules = {...Rule.rules, ...rules};
    }
    static getRule(key) {
        switch (toString.call(key)) {
            case '[object String]':
                return Rule.rules[key];
            case '[object RegExp]':
                return function (value, message) {
                    if (!key.test(value)) {
                        return message;
                    }
                };
            case '[object Function]':
                return key;
        }
    }
}