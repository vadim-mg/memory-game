import '@/scss/components/_card.scss';

export class Card {
    #element
    #img

    /**
     * Добавление карточки
     * @param {string} url
     * @param {string} altText
     * @param {string} additionalClass - additional class
     */
    constructor(url, altText, additionalClass = '') {
        this.#img = document.createElement('img');
        this.#img.classList.add('card_image');
        this.#img.src = url;
        this.#img.alt = altText;

        this.#element = document.createElement('div');
        this.#element.classList.add('card');
        this.#element.append(this.#img);
    }

    get element() {
        return this.#element;
    }
}