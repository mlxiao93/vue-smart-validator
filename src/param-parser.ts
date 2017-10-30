import scopedEval from './util/scoped-eval'

export class DirectiveParamParser {
    static modifiersSplitter = '@';

    private expressionObj;
    private modifiersObj;

    rules;
    options;


    private setExpressionObj ({ expression, context }) {
        let expressionObj = {};
        try {
            expressionObj = scopedEval(expression, context);
        } catch (e) {
            console.error('smart validator: invalid expression');
            expressionObj = {};
        }
        this.expressionObj = expressionObj;
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
        let { expressionObj } = this;
        let rules;
        if (Array.isArray(<any>expressionObj)) {
            rules = expressionObj;
        } else {
            rules = expressionObj.rules;
        }
        this.rules = rules;
    }

    private formatRules() {
        let { rules } = this;
        this.rules = rules.map(({ rule, message, trigger}) => {
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

            if (typeof message === 'string') {
                _rule.message = {'default': message}
            } else {
                _rule.message = message
            }

            return _rule;
        })
    }

    private setOptions() {
        let { expressionObj, modifiersObj, rules } = this;
        let options = modifiersObj;
        options.rules = rules;
        if (!Array.isArray(<any>expressionObj)) {
            options = {...options, ...expressionObj};
        }
        this.options = options;
    }

    constructor({ modifiers, expression, context }) {
        this.setExpressionObj({ expression,  context});
        this.setModifiersObj( { modifiers } );

        this.setRules();
        this.formatRules();
        this.setOptions();
    }
}