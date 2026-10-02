import { Header } from './components/Header.js'
import { CARD_IMAGES } from './components/images.js'
import { GameField } from './components/GameField.js'
import { Button } from './components/Button.js'
import { Counter } from './components/Counter.js'
import { Modal } from './components/modal.js'

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

const gameField = new GameField()
gameField.initCards(CARD_IMAGES)
document.body.appendChild(gameField.element)

const modal = new Modal()
document.body.appendChild(modal.element)

function newGame() {
    modal.close()
    gameField.initCards(CARD_IMAGES)
    movesCounter.reset()
    pairsCounter.reset()
}

btnNewGame.onClick(newGame)


gameField.onMoves(() => movesCounter.increment())
gameField.onPair(() => pairsCounter.increment())
gameField.onCheckWin(() => {
    if (pairsCounter.value !== CARD_IMAGES.length) {
        return
    }
    const h2 = document.createElement('h2')
    h2.textContent = 'Победа!'

    const result = document.createElement('div')
    result.textContent = `Игра завершена за ${movesCounter.value} ходов`

    const btnNewGameInModal = new Button('Новая игра', 'modal__btn')
    btnNewGameInModal.onClick(newGame)

    const closeBtn = new Button('Закрыть', 'modal__btn')
    closeBtn.onClick(() => {
        modal.close()
    })

    modal.setContent(h2, result, btnNewGameInModal.element, closeBtn.element)

    modal.open()
})


btnLeaders.onClick(() => {

})