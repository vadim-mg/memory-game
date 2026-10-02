
import '@/scss/components/_gameField.scss';
import { Card } from './Card.js';

export class GameField {
    #element

    #cards = []

    #pairIds = []

    constructor() {
        this.#element = document.createElement('main');
        this.#element.classList.add('game-field');
        this.#element.classList.add('container');
    }

    initCards(cardImages) {
        this.#element.replaceChildren();

        // const indexedCardImages = CARD_IMAGES.map((card, index) => ({
        //     id: index,
        //     ...card,
        // }));

        console.log(cardImages)

        const cardKeys = Object.keys(cardImages)

        console.log(cardKeys)

        const allRandomCardKeys = [...cardKeys, ...cardKeys]
            .sort(() => Math.random() - 0.5);

        console.debug(allRandomCardKeys)


        this.#pairIds = allRandomCardKeys.reduce((acc, cardKey, index) => {

            const imageInfo = cardImages[cardKey]
            const card = new Card(index, imageInfo.url, imageInfo.altText);
            card.onClick(() => {
                console.log('click - id:' + card.id)
                card.show()

            })
            this.#element.append(card.element);

            if (acc[cardKey]) {
                acc[cardKey].push(card);
            } else {
                acc[cardKey] = [card];
            }
            return acc;
        }, {});
        console.log(this.#cards);
        console.log(this.#pairIds);
    }

    get element() {
        return this.#element;
    }
}