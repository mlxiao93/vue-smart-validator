import {Validator} from './validator'
import {isEmpty} from "./util/data";
import scopedEval from './util/scoped-eval'

export default class ErrorTrigger {
    validator: Validator;
    constructor({validator}:{validator: Validator}) {
        this.validator = validator;
        this.checkTrigger();
    }

    checkTrigger() {
        let validator = this.validator;
        let targetEl = validator.targetEl;
        let triggers = validator.getExistsTriggers();
        for (let trigger of triggers) {
            if (trigger !== 'change' && !(`on${triggers}` in targetEl)) {
                console.error(`smart validator: can not register event 'on${triggers}' on element :`)
                console.log(targetEl)
            }
        }
    }

    register() {
        let validator = this.validator;
        let triggers = validator.getExistsTriggers();
        let targetEl = validator.targetEl;

        triggers.map(trigger => {
            targetEl.addEventListener(trigger, () => {
                validator.check({trigger})
            });
        });
    }

    triggerChange() {
        let validator = this.validator;
        validator.check({trigger: 'change'});
    }
}