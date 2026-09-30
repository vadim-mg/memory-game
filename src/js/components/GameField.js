import '@/scss/components/_gameField.scss';
import { Card } from './Card.js';

export class GameField {
    #element

    #cards = []

    constructor() {
        this.#element = document.createElement('main');
        this.#element.classList.add('game-field');
        this.#element.classList.add('container');

        this.initCards()
    }

    initCards() {

        this.#cards = Array.from({ length: 16 }, (_, i) => i + 1);
        this.#cards.sort(() => Math.random() - 0.5);
        this.#cards = this.#cards.map(card => card % 8 + 1);
        console.log(this.#cards);

        for (let i = 0; i < this.#cards.length; i += 1) {
            const imageNumber = this.#cards[i];

            const card = new Card(
                `./src/images/0${imageNumber}.jpeg`,
                `card ${imageNumber}`
            );
            this.#element.append(card.element);
        }
    }

    get element() {
        return this.#element;
    }
}