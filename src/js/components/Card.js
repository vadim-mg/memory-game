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

        // подсказка для review
        this.#element.dataset.reviewHelp = altText
        this.#element.classList.add('card')
        this.hide()
        this.disable()
    }

    get id() {
        return this.#id
    }

    get disabled() {
        return this.#disabled
    }

    disable(enableAfterDelay = false) {
        this.#element.classList.add('card_disabled')
        this.#disabled = true
        if (enableAfterDelay) {
            setTimeout(() => {
                this.enable()
            }, DELAY_SHOW_CARDS)
        }
    }
    enable() {
        this.#disabled = false
        this.#element.classList.remove('card_disabled')
    }

    hide(delay = false) {
        if(this.#img){
            this.#img.style.opacity = 0;
        }
        setTimeout(() => {
            this.#hidden = true
            this.#element.classList.add('card_hidden')
            this.#img?.remove()
        }, delay ? DELAY_SHOW_CARDS : 0)
    }


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

    onClick(func = () => { }) {
        this.#element.addEventListener('click', () => {
            if (this.disabled) {
                console.log('disabled!')
                return
            }
            func()
        })
    }

    get element() {
        return this.#element
    }

    found(){
        this.#element.classList.add('card_found')
    }
}