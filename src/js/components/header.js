import '@/scss/components/_header.scss';
import '@/scss/components/_container.scss';
import { Button } from './Button.js';

export class Header {
    #header

    constructor() {
        this.#header = document.createElement('header');
        this.#header.classList.add('header');
        this.#header.classList.add('container');

        const btnNewGame = new Button('Новая игра', 'header__btn');
        const btnLeaders = new Button('Таблица лидеров', 'header__btn');
        this.#header.append(btnNewGame.element, btnLeaders.element);

    }

    get element() {
        return this.#header;
    }
}