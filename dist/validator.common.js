'use strict';

const __assign = Object.assign || function (target) {
    for (var source, i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (var prop in source) {
            if (Object.prototype.hasOwnProperty.call(source, prop)) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
};

/**
 * @param expression 表达式 eg: a + b
 * @param scope eval函数执行上下文 eg: {a: 1, b: 2}
 * @returns {any}  表达式返回值 eg: 3
 */
var scopedEval = function (expression, scope) {
    var keys = Object.keys(scope);
    var values = keys.map(function (key) { return scope[key]; });
    return Function.apply(void 0, keys.concat(["return " + expression])).apply(scope, values);
};

var DirectiveParamParser = /** @class */ (function () {
    function DirectiveParamParser(_a) {
        var modifiers = _a.modifiers, expression = _a.expression, context = _a.context, directives = _a.directives;
        this.setVModelKey(directives);
        this.setExpressionObj({ expression: expression, context: context });
        this.setModifiersObj({ modifiers: modifiers });
        this.setRules();
        this.setOptions();
    }
    DirectiveParamParser.prototype.setExpressionObj = function (_a) {
        var expression = _a.expression, context = _a.context;
        var expressionObj = {};
        try {
            expressionObj = scopedEval(expression, context);
        }
        catch (e) {
            console.error('smart validator: invalid expression');
            expressionObj = {};
        }
        this.expressionObj = expressionObj;
    };
    DirectiveParamParser.prototype.setModifiersObj = function (_a) {
        var modifiers = _a.modifiers;
        var obj = {};
        for (var key in modifiers) {
            var keys = key.split(DirectiveParamParser.modifiersSplitter);
            obj[keys[0]] = keys[1] === undefined ? modifiers[key] : keys[1];
        }
        this.modifiersObj = obj;
    };
    DirectiveParamParser.prototype.setRules = function () {
        var expressionObj = this.expressionObj;
        var rules;
        if (Array.isArray(expressionObj)) {
            rules = expressionObj;
        }
        else if (Array.isArray(expressionObj.rules)) {
            rules = expressionObj.rules;
        }
        else {
            rules = [expressionObj];
        }
        this.rules = this.formatRules(rules);
    };
    DirectiveParamParser.prototype.formatRules = function (rules) {
        return rules.map(function (_a) {
            var rule = _a.rule, message = _a.message, trigger = _a.trigger;
            var _rule = {
                key: '',
                modifies: {},
                message: {},
                trigger: trigger
            };
            if (typeof rule === 'string') {
                var ruleSplits = rule.split('.');
                _rule.key = ruleSplits[0].split(/\s*:\s*/)[0];
                if (ruleSplits.length <= 1) {
                    _rule.modifies = ruleSplits[0].split(/\s*:\s*/)[1];
                }
                else {
                    ruleSplits.map(function (item) {
                        var itemSplits = item.split(/\s*:\s*/);
                        _rule.modifies[itemSplits[0]] = itemSplits[1] === undefined ? true : itemSplits[1];
                    });
                }
            }
            else if (toString.call(rule) === '[object Object]') {
                _rule.key = Object.keys(rule)[0];
                _rule.modifies = rule[_rule.key];
            }
            else {
                _rule.key = rule;
            }
            _rule.message = message;
            return _rule;
        });
    };
    DirectiveParamParser.prototype.setOptions = function () {
        var _a = this, expressionObj = _a.expressionObj, modifiersObj = _a.modifiersObj, rules = _a.rules;
        var options = modifiersObj;
        options.rules = rules;
        if (!Array.isArray(expressionObj)) {
            options = __assign({}, options, expressionObj);
        }
        this.options = options;
    };
    DirectiveParamParser.prototype.setVModelKey = function (directives) {
        var vModel = directives.filter(function (item) { return item.name === 'model'; })[0];
        if (!vModel)
            throw 'smart validator: v-model not found';
        this.vModelKey = vModel.expression;
    };
    DirectiveParamParser.modifiersSplitter = '@';
    return DirectiveParamParser;
}());

/**
 * 判断值是否为空，定义为空的情况为：
 * 1. null
 * 2. undefined
 * 3. 空数组: []
 * 4. 只包含空格或者空字符串: ''或'  '
 * 5. 空对象：{}, 不考虑原型上的属性
 * @param val
 * @returns {boolean}
 */
function isEmpty(val) {
    if (val === undefined || val === null)
        return true;
    if (Array.isArray(val))
        return val.length <= 0;
    if (typeof val === 'string')
        return val.trim() === '';
    if (JSON.stringify(val) === '{}')
        return true;
    return false;
}

/**
 * 校验规则
 */
var Rule = /** @class */ (function () {
    function Rule() {
    }
    Rule.extendRules = function (rules) {
        if (rules === void 0) { rules = {}; }
        Rule.rules = __assign({}, Rule.rules, rules);
    };
    Rule.getRule = function (key) {
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
    };
    Rule.rules = {
        required: function (value, message) {
            if (message === void 0) { message = 'can not be empty'; }
            if (isEmpty(value)) {
                return message;
            }
        },
        number: function (value, message) {
            if (message === void 0) { message = 'must be numbers'; }
            if (!/^\d*$/.test(value)) {
                return message;
            }
        }
    };
    return Rule;
}());

var Validator = /** @class */ (function () {
    function Validator(_a) {
        var rules = _a.rules, options = _a.options;
        this.validators = [];
        this.setValidators({ rules: rules, options: options });
    }
    Validator.prototype.setValidators = function (_a) {
        var _this = this;
        var rules = _a.rules, options = _a.options;
        var validators = this.validators;
        rules.map(function (_a, index) {
            var key = _a.key, modifies = _a.modifies, message = _a.message, trigger = _a.trigger;
            var rule = Rule.getRule(key);
            if (!rule)
                return console.error("smart validator: rule '" + key + "' do not exists");
            var _trigger = trigger || options.trigger || Validator.trigger;
            validators.push({
                key: typeof key === 'string' ? key : undefined,
                check: function (modelValue) {
                    return rule.call(_this, modelValue, message, modifies);
                },
                trigger: _trigger
            });
        });
    };
    Validator.prototype.getExistsTriggers = function () {
        var triggerObj = {};
        this.validators.map(function (item) { return triggerObj[item.trigger] = true; });
        return Object.keys(triggerObj);
    };
    Validator.prototype.check = function (_a) {
        var modelValue = _a.modelValue, trigger = _a.trigger;
        var validators = this.validators;
        for (var _i = 0, validators_1 = validators; _i < validators_1.length; _i++) {
            var validator = validators_1[_i];
            var message = void 0;
            if (trigger) {
                (validator.trigger === trigger) && (message = validator.check(modelValue));
            }
            else {
                message = validator.check(modelValue);
            }
            validator.errorMessage = message;
        }
        return this;
    };
    Validator.prototype.getError = function (ruleKey) {
        var _validator = this.validators.filter(function (_a, index) {
            var key = _a.key, errorMessage = _a.errorMessage;
            if (ruleKey === undefined)
                return errorMessage;
            return ruleKey === key || +ruleKey === index;
        })[0];
        return _validator && _validator.errorMessage || undefined;
    };
    Validator.trigger = 'blur';
    return Validator;
}());

var Validators = /** @class */ (function () {
    function Validators() {
        this.validators = [];
    }
    Validators.getInstance = function (uid) {
        var instance = Validators.instanceMap[uid];
        if (!instance)
            instance = Validators.instanceMap[uid] = new Validators();
        return instance;
    };
    Validators.prototype.addValidator = function (_a) {
        var validator = _a.validator, options = _a.options, vModelKey = _a.vModelKey;
        this.validators.push({
            key: options.key || vModelKey,
            group: options.group,
            validator: validator
        });
    };
    Validators.prototype.check = function () {
        var validators = this.validators;
        validators.map(function (validator) {
        });
    };
    Validators.instanceMap = {};
    return Validators;
}());

var validatorDirective = {
    bind: function (el, _a, _b, oldVnode) {
        var arg = _a.arg, modifiers = _a.modifiers, expression = _a.expression;
        var context = _b.context, data = _b.data;
        var paramParser = new DirectiveParamParser({ modifiers: modifiers, expression: expression, context: context, directives: data.directives });
        var validator = new Validator({ rules: paramParser.rules, options: paramParser.options });
        var $validator = Validators.getInstance(context._uid);
        $validator.addValidator({ validator: validator, options: paramParser.options, vModelKey: paramParser.vModelKey });
        context.$validator = $validator;
        var triggers = validator.getExistsTriggers();
        triggers.map(function (trigger) {
            el.addEventListener(trigger, function () {
                var message = validator.check({ modelValue: el.value, trigger: trigger }).getError();
                if (message) {
                    console.error(message);
                }
                else {
                    console.log('OK');
                }
            });
        });
        // el.addEventListener('blur', () => {
        //     let message = Rule.rules.required({value: el.value});
        // })
    }
};

var Index = /** @class */ (function () {
    function Index(_a) {
        var _b = _a === void 0 ? {} : _a, rules = _b.rules, trigger = _b.trigger;
        Rule.extendRules(rules);
        if (trigger)
            Validator.trigger = trigger;
    }
    Index.prototype.install = function (Vue) {
        Vue.directive('validator', validatorDirective);
    };
    
    return Index;
}());

module.exports = Index;
