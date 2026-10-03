import '@/scss/components/_card.scss'

const DELAY_SHOW_CARDS = 800

export class Card {
    #id
    #url
    #altText

    #element
    #img

    #hidden

    #disabled

    /**
     * Creates a card
     * @param {number} id
     * @param {string} url
     * @param {string} altText
     * @param {string | string[]} [additionalClass=''] - additional class(es)
     */
    constructor(id, url, altText, additionalClass = '') {
        this.#id = id
        this.#url = url
        this.#altText = altText

        this.#element = document.createElement('div')
        this.#element.id = this.#id

        // hint for review
        this.#element.dataset.reviewHelp = altText
        this.#element.classList.add('card')

        this.#applyClasses(additionalClass)

        this.hide()
        this.disable()
    }

    get id() {
        return this.#id
    }

    get disabled() {
        return this.#disabled
    }

    /**
     * Disables the card
     * @param {boolean} [enableAfterDelay=false] - re-enable after DELAY_SHOW_CARDS
     * @returns {void}
     */
    disable(enableAfterDelay = false) {
        this.#element.classList.add('card_disabled')
        this.#disabled = true

        if (enableAfterDelay) {
            setTimeout(() => this.enable(), DELAY_SHOW_CARDS)
        }
    }

    /**
     * Enables the card
     * @returns {void}
     */
    enable() {
        this.#disabled = false
        this.#element.classList.remove('card_disabled')
    }

    /**
     * Hides the card
     * @param {boolean} [delay=false] - use DELAY_SHOW_CARDS before hiding
     * @returns {void}
     */
    hide(delay = false) {
        if (this.#img) {
            this.#img.style.opacity = 0
        }

        setTimeout(() => {
            this.#hidden = true
            this.#element.classList.add('card_hidden')
            this.#img?.remove()
        }, delay ? DELAY_SHOW_CARDS : 0)
    }

    /**
     * Shows the card
     * @param {boolean} [delay=false] - auto-hide after DELAY_SHOW_CARDS
     * @returns {void}
     */
    show(delay = false) {
        this.#hidden = false
        this.#element.classList.remove('card_hidden')

        this.#img = document.createElement('img')
        this.#img.classList.add('card__image')
        this.#img.src = this.#url
        this.#img.alt = this.#altText
        this.#element.append(this.#img)

        if (delay) {
            setTimeout(() => {
                this.hide()
                this.enable()
            }, DELAY_SHOW_CARDS)
        }
    }

    /**
     * Registers a click handler (ignored while disabled)
     * @param {() => void} [func=() => {}]
     * @returns {void}
     */
    onClick(func = () => {}) {
        this.#element.addEventListener('click', () => {
            if (this.disabled) {
                return
            }
            func()
        })
    }

    get element() {
        return this.#element
    }

    /**
     * Marks the card as found
     * @returns {void}
     */
    found() {
        this.#element.classList.add('card_found')
    }

    /**
     * Applies one or several additional classes
     * @param {string | string[]} additionalClass
     * @returns {void}
     */
    #applyClasses(additionalClass) {
        const classes = Array.isArray(additionalClass) ? additionalClass : [additionalClass]
        this.#element.classList.add(...classes.filter(Boolean))
    }
}