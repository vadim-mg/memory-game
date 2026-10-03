import '@/scss/components/_button.scss';

export class Button {
    #element;

    /**
     * @param {string} text
     * @param {string | string[]} [additionalClass='']
     */
    constructor(text, additionalClass = '') {
        this.#element = document.createElement('button');
        this.#element.type = 'button';
        this.#element.textContent = text;
        this.#element.classList.add('button');

        this.#applyClasses(additionalClass);
    }

    get element() {
        return this.#element;
    }

    /**
     * @param {(event: MouseEvent) => void} handler
     * @returns {this}
     */
    onClick(handler) {
        this.#element.addEventListener('click', handler);
        return this;
    }

    /**
     * @param {boolean} [value=true]
     * @returns {this}
     */
    setDisabled(value = true) {
        this.#element.disabled = value;
        return this;
    }

    /**
     * @param {string} text
     * @returns {this}
     */
    setText(text) {
        this.#element.textContent = text;
        return this;
    }

    /**
     * @param {string | string[]} additionalClass
     * @returns {void}
     */
    #applyClasses(additionalClass) {
        const classes = Array.isArray(additionalClass) ? additionalClass : [additionalClass];
        this.#element.classList.add(...classes.filter(Boolean));
    }
}