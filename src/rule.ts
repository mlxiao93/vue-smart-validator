import Options from "./options";

export class Rule {
    static getRule(key) {
        let rules = Options.getInstance().getOptions().rules;
        let rule;
        if (toString.call(key) === '[object String]') {
            rule = rules[key];
            if (rule === undefined) {
                console.error(`smart validator: rule ${key} do snot exists`)
            }
        } else {
            rule = key;
        }

        switch (toString.call(rule)) {
            case '[object String]':
                return function (val) {
                    return val === rule;
                };
            case '[object RegExp]':
                return function (value) {
                    return rule.test(value);
                };
            case '[object Function]':
                return rule;
        }
    }
}