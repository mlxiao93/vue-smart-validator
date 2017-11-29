export type options = {
    group?: string,
    trigger?: string
}

export type rules = Array<{
    key: string|object|Function,
    modifies?: object|string|number,
    message?: string,
    trigger?: string
}>;

export class DirectiveParamParser {
    static modifiersSplitter = '@';

    private directiveValue;
    private modifiersObj;

    rules: rules;
    options: options;
    vModelKey: string;


    private setDirectiveValue ({ value }) {
        this.directiveValue = value || {};
    }

    private setModifiersObj({ modifiers }) {
        let obj = {};
        for(let key in modifiers) {
            let keys = key.split(DirectiveParamParser.modifiersSplitter);
            obj[keys[0]] = keys[1] === undefined ? modifiers[key] : keys[1];
        }
        this.modifiersObj = obj;
    }

    private setRules() {
        let { directiveValue } = this;
        let rules;   // [{rule: 'required', message: ''}]
        if (Array.isArray(<any>directiveValue)) {   // [{rule: 'required', message: ''}]
            rules = directiveValue;
        } else if (Array.isArray(directiveValue.rules)) {   // {rules: [{rule: 'required', message: ''}], group: ''}
            rules = directiveValue.rules;
        } else {
            rules = [directiveValue];     // {rule: 'required', message: ''}
        }

        this.rules = this.formatRules(rules);
    }

    private formatRules(rules) {
        return rules.map(({ rule, message, trigger}) => {
            let _rule = {
                key: '',
                modifies: {},
                message: {},
                trigger: trigger
            };

            if (typeof rule === 'string') {
                let ruleSplits = rule.split('.');
                _rule.key = ruleSplits[0].split(/\s*:\s*/)[0];
                if (ruleSplits.length <= 1) {
                    _rule.modifies = ruleSplits[0].split(/\s*:\s*/)[1];
                } else {
                    ruleSplits.map(item => {
                        let itemSplits = item.split(/\s*:\s*/);
                        _rule.modifies[itemSplits[0]] = itemSplits[1] === undefined ? true : itemSplits[1]
                    });
                }
            } else if (toString.call(rule) === '[object Object]') {
                _rule.key = Object.keys(rule)[0];
                _rule.modifies = rule[_rule.key];
            } else {
                _rule.key = rule;
            }

            _rule.message = message;    // TODO merge error message

            return _rule;
        })
    }

    private setOptions() {
        let { directiveValue, modifiersObj, rules } = this;
        let options = modifiersObj;
        options.rules = rules;
        if (!Array.isArray(<any>directiveValue)) {
            options = {...options, ...directiveValue};
        }
        this.options = options;
    }

    private setVModelKey(data) {
        let vModel;
        if (data.model) {
            vModel = data.model;
        } else {
            vModel = data.directives.filter(item => item.name === 'model')[0];
        }

        if (!vModel) throw 'smart validator: v-model not found';
        this.vModelKey = vModel.expression
    }

    constructor({ modifiers, value, data }) {
        this.setVModelKey(data);
        this.setDirectiveValue({ value });
        this.setModifiersObj( { modifiers } );

        this.setRules();
        this.setOptions();
    }
}