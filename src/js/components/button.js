import '@/scss/components/_button.scss';

export class Button {
    #element

    /**
     * Добавление кнопки
     * @param {string} text
     * @param {string} additionalClass - additional class
     */
    constructor(text, additionalClass = '') {
        this.#element = document.createElement('button');
        this.#element.classList.add('button');
        this.#element.classList.add(additionalClass);
        this.#element.textContent = text;
    }

    get element() {
        return this.#element;
    }
}