import { Header } from './components/Header.js'
import { GameField } from './components/GameField.js'
import { Button } from './components/Button.js'

const btnNewGame = new Button('Новая игра', 'header__btn')
const btnLeaders = new Button('Таблица лидеров', 'header__btn')

const header = new Header(btnNewGame.element, btnLeaders.element)
document.body.appendChild(header.element)

const gameFiled = new GameField()
document.body.appendChild(gameFiled.element)

btnNewGame.onClick(() => {
    gameFiled.initCards()
})