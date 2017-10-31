/**
 * 校验规则
 */

import { isEmpty } from './util/data';

export class Rule {
    static rules = {
        required ({ value, message = '不能为空' }: { value: string, message?: string}) {
            if (isEmpty(value)) {
                return message;
            }
        }
    };
    static extendRules(rules = {}) {
        Rule.rules = {...Rule.rules, ...rules};
    }
}