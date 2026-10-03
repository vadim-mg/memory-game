import '@/scss/components/_gameField.scss';
import { Card } from './Card.js';

/**
 * GameField — grid of memory cards with click handling,
 * move/pair counters and win detection.
 */
export class GameField {
    #element

    #cards = []

    #allRandomImageKeys = []

    #firstOpenCard = null

    #movesCounterHandler = () => { }

    #pairsCounterHandler = () => { }

    #checkWinHandler = () => { }

    constructor() {
        this.#element = document.createElement('main');
        this.#element.classList.add('game-field');
        this.#element.classList.add('container');
    }

    /**
     * Builds the card grid from the given images (each image is duplicated as a pair)
     * @param {Record<string, { url: string, altText: string }>} cardImages
     * @returns {void}
     */
    initCards(cardImages) {
        this.#element.replaceChildren();

        const imageKeys = Object.keys(cardImages)

        this.#allRandomImageKeys = [...imageKeys, ...imageKeys]
            .sort(() => Math.random() - 0.5);

        this.#allRandomImageKeys.forEach((imageKey, cardId) => {
            const imageInfo = cardImages[imageKey]
            const card = new Card(cardId, imageInfo.url, imageInfo.altText);
            card.onClick(() => {
                this.#cards[card.id] = card
                this.#cardClickHandler(card.id)
            })
            this.#element.append(card.element);
            this.#cards[card.id] = card
            card.enable()
        }, {});

        this.#firstOpenCard = false;
    }

    /**
     * Handles a card click: opens the first card, compares the second with it,
     * marks a found pair or hides both cards
     * @param {number} cardId
     * @returns {void}
     */
    #cardClickHandler(cardId) {
        const pairId = this.#allRandomImageKeys[cardId]

        const card = this.#cards[cardId]
        card.disable()
        if (!this.#firstOpenCard) {
            this.#firstOpenCard = card
            card.show()
            return
        }

        this.#movesCounterHandler();

        if (pairId == this.#allRandomImageKeys[this.#firstOpenCard.id]) {
            card.show()
            card.found()
            this.#firstOpenCard.found()
            this.#firstOpenCard = null

            this.#pairsCounterHandler();
            this.#checkWinHandler();
            return
        }

        card.show(true)
        this.#firstOpenCard.hide(true)
        setTimeout(() => {
            card.hide(true)
        }, 0);
        this.#firstOpenCard = null

        this.#cards.forEach(card => {
            card.disable(true)
        })
    }

    /**
     * @returns {HTMLElement}
     */
    get element() {
        return this.#element;
    }

    /**
     * Registers a handler called on each move
     * @param {() => void} handler
     * @returns {void}
     */
    onMoves(handler) {
        this.#movesCounterHandler = handler
    }

    /**
     * Registers a handler called when a pair is found
     * @param {() => void} handler
     * @returns {void}
     */
    onPair(handler) {
        this.#pairsCounterHandler = handler
    }

    /**
     * Registers a handler called when all pairs are found
     * @param {() => void} handler
     * @returns {void}
     */
    onCheckWin(handler) {
        this.#checkWinHandler = handler
    }
}