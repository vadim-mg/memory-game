import '@/scss/components/_card.scss'

export class Card {
    #id
    #url
    #altText

    #element
    #img

    #hidden

    /**
     * Добавление карточки
     * @param {number} id
     * @param {string} url
     * @param {string} altText
     * @param {string} additionalClass - additional class
     */
    constructor(id, url, altText, additionalClass = '') {
        this.#id = id
        this.#url = url
        this.#altText = altText

        this.#element = document.createElement('div')
        this.#element.id = this.#id
        this.#element.classList.add('card')
        this.hide()
    }

    get id() {
        return this.#id
    }

    hide() {
        this.#hidden = true
        this.#element.classList.add('card_hidden')
        this.#img?.remove()
    }

    show() {
        this.#hidden = false
        this.#element.classList.remove('card_hidden')
        this.#img = document.createElement('img')
        this.#img.classList.add('card__image')
        this.#img.src = this.#url
        this.#img.alt = this.#altText
        this.#element.append(this.#img)
    }

    onClick(func = () => { }) {
        this.#element.addEventListener('click', func)
    }

    get element() {
        return this.#element
    }
}