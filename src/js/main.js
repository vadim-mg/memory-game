import { Header } from './components/Header.js'
import { CARD_IMAGES } from './components/images.js'
import { GameField } from './components/GameField.js'
import { Button } from './components/Button.js'
import { Counter } from './components/Counter.js'

import '@/scss/main.scss'

const btnNewGame = new Button('Новая игра', 'header__btn')
const btnLeaders = new Button('Таблица лидеров', 'header__btn')

const header = new Header(btnNewGame.element, btnLeaders.element)
document.body.appendChild(header.element)

const countersPanel = document.createElement('div')
countersPanel.classList.add('counters-panel')
document.body.appendChild(countersPanel)

const movesCounter = new Counter(0, 'Ходы')
countersPanel.appendChild(movesCounter.element)

const pairsCounter = new Counter(0, 'Найдено пар')
countersPanel.appendChild(pairsCounter.element)

const gameFiled = new GameField(movesCounter, pairsCounter)
gameFiled.initCards(CARD_IMAGES)
document.body.appendChild(gameFiled.element)

btnNewGame.onClick(() => {
    gameFiled.initCards(CARD_IMAGES)
    movesCounter.reset()
    pairsCounter.reset()
})