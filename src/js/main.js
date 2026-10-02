import { Header } from './components/Header.js'
import { CARD_IMAGES } from './components/images.js';
import { GameField } from './components/GameField.js'
import { Button } from './components/Button.js'

const btnNewGame = new Button('Новая игра', 'header__btn')
const btnLeaders = new Button('Таблица лидеров', 'header__btn')

const header = new Header(btnNewGame.element, btnLeaders.element)
document.body.appendChild(header.element)

// console.log(CARD_IMAGES)

const gameFiled = new GameField()
gameFiled.initCards(CARD_IMAGES)
document.body.appendChild(gameFiled.element)

btnNewGame.onClick(() => {
    gameFiled.initCards(CARD_IMAGES)
})