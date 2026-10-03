import '@/scss/components/_modal.scss'
import '@/scss/components/_container.scss'

export class Modal {
    #element;
    #content;

    constructor() {
        this.#element = document.createElement('dialog');
        this.#element.classList.add('modal');

        this.#content = document.createElement('div');
        this.#content.classList.add('modal__content');
        this.#element.append(this.#content);

        // close on backdrop click
        this.#element.addEventListener('click', (event) => {
            if (event.target === this.#element) {
                this.close();
            }
        });

        // restore body scroll on any close
        this.#element.addEventListener('close', () => {
            document.body.style.overflow = '';
        });
    }

    get element() {
        return this.#element;
    }

    /**
     * @param {...Node} children
     * @returns {this}
     */
    setContent(...children) {
        this.#content.replaceChildren(...children);
        return this;
    }

    /**
     * @returns {this}
     */
    open() {
        if (!this.#element.open) {
            this.#element.showModal();
            document.body.style.overflow = 'hidden';
        }
        return this;
    }

    /**
     * @returns {this}
     */
    close() {
        if (this.#element.open) {
            this.#element.close();
        }
        return this;
    }
}