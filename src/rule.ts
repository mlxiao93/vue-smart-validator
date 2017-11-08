import Options from "./options";

export class Rule {
    static getRule(key) {
        let rules = Options.getInstance().getOptions().rules
        switch (toString.call(key)) {
            case '[object String]':
                return rules[key];
            case '[object RegExp]':
                return function (value) {
                    return key.test(value);
                };
            case '[object Function]':
                return key;
        }
    }
}