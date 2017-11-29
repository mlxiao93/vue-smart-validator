export function isEditableFormEl(el: HTMLElement) {
    return ['input', 'select', 'textarea'].indexOf(el.tagName.toLowerCase()) >= 0;
}

export function onlyOneEditableFormElChild(el: HTMLElement) {
    return el.querySelectorAll('input, select, textarea').length === 1;
}

export function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export function appendErrorEl(target: HTMLElement, message) {
    let nextEl = <HTMLElement>target.nextSibling;
    if (nextEl && nextEl.id === 'validator-error-tip') {
        nextEl.innerHTML = `${message}`;
        return;
    }
    let errorEl = document.createElement('span');
    errorEl.id = 'validator-error-tip';
    errorEl.className = 'validator-error-tip';
    errorEl.innerHTML = `${message}`;
    insertAfter(errorEl, target);
}

export function removeErrorEl(target) {
    let nextEl = <HTMLElement>target.nextSibling;
    if (nextEl && nextEl.id === 'validator-error-tip') {
        nextEl.remove();
    }
}