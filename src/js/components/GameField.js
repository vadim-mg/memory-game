
import '@/scss/components/_gameField.scss';
import { Card } from './Card.js';

export class GameField {
    #element

    #cards = []

    #allRandomImageKeys = []

    #firstOpenCard = null

    #secondOpenCard = null



    constructor() {
        this.#element = document.createElement('main');
        this.#element.classList.add('game-field');
        this.#element.classList.add('container');
    }

    initCards(cardImages) {
        this.#element.replaceChildren();

        console.log('cardImages')
        console.log(cardImages)

        const imageKeys = Object.keys(cardImages)

        console.log('imageKeys')
        console.log(imageKeys)

        this.#allRandomImageKeys = [...imageKeys, ...imageKeys]
            .sort(() => Math.random() - 0.5);

        console.debug('this.#allRandomImageKeys')
        console.debug(this.#allRandomImageKeys)


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
        console.log('this.#cards');
        console.log(this.#cards);
    }

    #cardClickHandler(cardId) {
        console.log(`-----------click-----------------`)
        console.log(`card::${cardId}`)
        const pairId = this.#allRandomImageKeys[cardId]
        console.log(`pairId::${pairId}`)

        const card = this.#cards[cardId]
        console.log(card)
        card.disable()
        if (!this.#firstOpenCard) {
            this.#firstOpenCard = card
            card.show()
            return
        }

        if (pairId == this.#allRandomImageKeys[this.#firstOpenCard.id]) {
            this.#firstOpenCard = null
            console.log('!!!!!!!!!!!!!!!')
            card.show()
            this.#firstOpenCard = null

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
}