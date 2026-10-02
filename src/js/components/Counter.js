export class Counter {
    #value;
    #label;
    #element;

    /**
     * @param {number} initValue
     * @param {string} [label='']
     */
    constructor(initValue = 0, label = '') {
        this.#value = initValue;
        this.#label = label;
        this.#element = document.createElement('span');
        this.#element.classList.add('counter');
        this.#render();
    }

    get element() {
        return this.#element;
    }

    get value() {
        return this.#value;
    }

    increment(step = 1) {
        this.#value += step;
        this.#render();
        return this;
    }

    set(value) {
        this.#value = value;
        this.#render();
        return this;
    }

    reset() {
        this.#value = 0;
        this.#render();
        return this;
    }

    #render() {
        this.#element.textContent = this.#label
            ? `${this.#label}: ${this.#value}`
            : String(this.#value);
    }
}