import { CARD_IMAGES } from './images.js';
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

        this.initCards()
    }

    initCards() {
        this.#element.replaceChildren();

        const indexedCardImages = CARD_IMAGES.map((card, index) => ({
            id: index,
            ...card,
        }));

        this.#cards = [...indexedCardImages, ...indexedCardImages]
            .sort(() => Math.random() - 0.5);
        // .map((card, index) => card % 8 + 1);
        this.#pairIds = this.#cards.reduce((acc, card, index) => {
            if (acc[card.id]) {
                acc[card.id].push(index);
            } else {
                acc[card.id] = [index];
            }
            return acc;
        }, {});
        console.log(this.#cards);
        console.log(this.#pairIds);

        this.#cards.forEach((cardData, index) => {
            const card = new Card(index, cardData.url, cardData.altText);
            card.onClick(() => {
                console.log('click - id:' + card.id)
                card.show()
            })
            this.#element.append(card.element);
        })

    }

    get element() {
        return this.#element;
    }
}