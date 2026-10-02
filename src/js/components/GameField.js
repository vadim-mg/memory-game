
import '@/scss/components/_gameField.scss';
import { Card } from './Card.js';

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

    initCards(cardImages) {
        this.#element.replaceChildren();

        const imageKeys = Object.keys(cardImages)

        this.#allRandomImageKeys = [...imageKeys, ...imageKeys]
            .sort(() => Math.random() - 0.5);

        this.#allRandomImageKeys.forEach((imageKey, cardId) => {
            const imageInfo = cardImages[imageKey]
            const card = new Card(cardId, imageInfo.url, imageInfo.altText);
            card.onClick(() => {
                console.log('click - id:' + card.id)
                this.#cards[card.id] = card
                this.#cardClickHandler(card.id)
            })
            this.#element.append(card.element);
            this.#cards[card.id] = card
            card.enable()
        }, {});

        this.#firstOpenCard = false;
    }

    #cardClickHandler(cardId) {
        const pairId = this.#allRandomImageKeys[cardId]

        const card = this.#cards[cardId]
        card.disable()
        if (!this.#firstOpenCard) {
            this.#firstOpenCard = card
            card.show()
            return
        }

        // this.#movesCounter.increment();
        this.#movesCounterHandler();

        if (pairId == this.#allRandomImageKeys[this.#firstOpenCard.id]) {
            // this.#firstOpenCard = null
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

    get element() {
        return this.#element;
    }

    onMoves(handler) {
        this.#movesCounterHandler = handler
    }

    onPair(handler) {
        this.#pairsCounterHandler = handler
    }

    onCheckWin(handler) {
        this.#checkWinHandler = handler
    }
}