import {Validator} from './validator'
import { isEditableFormEl, onlyOneEditableFormElChild } from './util/dom'

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

        if (isEditableFormEl(targetEl)) {
            triggers.map(trigger => {
                if (trigger !== 'change' && !(`on${trigger}` in targetEl)) {
                    console.error(`smart validator: can not register event 'on${trigger}' on element :`);
                    console.log(targetEl)
                }
            })
        }
    }

    register() {
        let validator = this.validator;
        let componentInstance = validator.componentInstance;
        let triggers = validator.getExistsTriggers();
        let targetEl = validator.targetEl;

        if (isEditableFormEl(targetEl)) {
            triggers.map(trigger => {
                targetEl.addEventListener(trigger, () => {
                    validator.check({trigger})
                });
            });
        } else {
            triggers.map(trigger => {
                componentInstance.$on(trigger, (value) => {
                    validator.check({trigger});
                });
            });
            if (onlyOneEditableFormElChild(targetEl)) {
                triggers.map(trigger => {
                    targetEl.querySelector('input, select, textarea').addEventListener(trigger, () => {
                        setTimeout(() => validator.check({trigger}));
                    });
                });
            }
        }

    }

    triggerChange() {
        let validator = this.validator;
        validator.check({trigger: 'change'});
    }
}