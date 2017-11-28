export function isEditableFormEl(el: HTMLElement) {
    return ['input', 'select', 'textarea'].indexOf(el.tagName.toLowerCase()) >= 0;
}

export function onlyOneEditableFormElChild(el: HTMLElement) {
    return el.querySelectorAll('input, select, textarea').length === 1;
}