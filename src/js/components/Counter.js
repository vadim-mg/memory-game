/**
 * Counter component — displays a numeric value with an optional label.
 */
export class Counter {
    #value;
    #label;
    #element;

    /**
     * Creates a counter
     * @param {number} [initValue=0]
     * @param {string} [label='']
     */
    constructor(initValue = 0, label = '') {
        this.#value = initValue;
        this.#label = label;
        this.#element = document.createElement('span');
        this.#element.classList.add('counter');
        this.#render();
    }

    /**
     * @returns {HTMLSpanElement}
     */
    get element() {
        return this.#element;
    }

    /**
     * @returns {number}
     */
    get value() {
        return this.#value;
    }

    /**
     * Increases the value by `step`
     * @param {number} [step=1]
     * @returns {this}
     */
    increment(step = 1) {
        this.#value += step;
        this.#render();
        return this;
    }

    /**
     * Sets the value
     * @param {number} value
     * @returns {this}
     */
    set(value) {
        this.#value = value;
        this.#render();
        return this;
    }

    /**
     * Resets the value to 0
     * @returns {this}
     */
    reset() {
        this.#value = 0;
        this.#render();
        return this;
    }

    /**
     * Renders the counter text: `label: value` or just `value`
     * @returns {void}
     */
    #render() {
        this.#element.textContent = this.#label
            ? `${this.#label}: ${this.#value}`
            : String(this.#value);
    }
}