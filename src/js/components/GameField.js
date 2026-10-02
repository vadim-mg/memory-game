
import '@/scss/components/_gameField.scss';
import { Card } from './Card.js';

export class GameField {
    #element

    #cards = []

    #allRandomImageKeys = []

    #firstOpenCard = null

    #movesCounterHandler = () => { }

    #pairsCounterHandler = () => { }

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
            this.#firstOpenCard = null
            card.show()
            this.#firstOpenCard = null

            this.#pairsCounterHandler();
            return
        }

        card.show(true)
        this.#firstOpenCard.hide(true)
        this.#firstOpenCard = null

        this.#cards.forEach(card => {
            card.disable(true)
        })
    }

    get element() {
        return this.#element;
    }

    onMoves(func){
        this.#movesCounterHandler = func
    }

    onPair(func){
        this.#pairsCounterHandler = func
    }
}