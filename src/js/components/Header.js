import '@/scss/components/_header.scss'
import '@/scss/components/_container.scss'

/**
 * Header — top bar with a container and a group of buttons/children.
 */
export class Header {
    #header

    /**
     * Creates a header with the given children inside a button group
     * @param {...Node} children
     */
    constructor(...children) {
        this.#header = document.createElement('header')
        this.#header.classList.add('header')

        const container = document.createElement('div')
        container.classList.add('container')

        const buttonGroup = document.createElement('div')
        buttonGroup.classList.add('header__button-group')
        buttonGroup.append(...children)

        container.append(buttonGroup)

        this.#header.append(container)
    }

    /**
     * @returns {HTMLElement}
     */
    get element() {
        return this.#header
    }
}