import '@/scss/components/_modal.scss'
import '@/scss/components/_container.scss'

export class Modal {
    #element;
    #content;

    /**
     * @param {string} className
     */
    constructor(modifier = '') {
        this.#element = document.createElement('dialog');
        this.#element.classList.add('modal');
        if (modifier) this.#element.classList.add(`modal--${modifier}`);

        this.#content = document.createElement('div');
        this.#content.classList.add('modal__content');
        this.#element.append(this.#content);

        // закрытие по backdrop
        this.#element.addEventListener('click', (event) => {
            if (event.target === this.#element) {
                this.close();
            }
        });

        // снятие блокировки скролла — при любом закрытии
        this.#element.addEventListener('close', () => {
            document.body.style.overflow = '';
        });
    }

    get element() {
        return this.#element;
    }

    /**
     * @param {...Node} children
     */
    setContent(...children) {
        this.#content.replaceChildren(...children);
        return this;
    }

    open() {
        if (!this.#element.open) {
            this.#element.showModal();
            document.body.style.overflow = 'hidden';
        }
        return this;
    }

    close() {
        if (this.#element.open) {
            this.#element.close();
        }
        return this;
    }
}