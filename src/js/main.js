import { Header } from './components/Header.js'
import { CARD_IMAGES } from './components/images.js'
import { GameField } from './components/GameField.js'
import { Button } from './components/Button.js'
import { Counter } from './components/Counter.js'
import { Modal } from './components/modal.js'

import '@/scss/main.scss'
import { LeadersTable } from './components/LeaderTable.js'

// --- header ---
const btnNewGame = new Button('Новая игра', 'header__btn')
const btnLeaders = new Button('Таблица лидеров', 'header__btn')
const header = new Header(btnNewGame.element, btnLeaders.element)

// --- Counters ---
const movesCounter = new Counter(0, 'Ходы')
const pairsCounter = new Counter(0, 'Найдено пар')

const countersPanel = document.createElement('div')
countersPanel.classList.add('counters-panel')
countersPanel.append(movesCounter.element, pairsCounter.element)

// --- Game field ---
const gameField = new GameField()
gameField.initCards(CARD_IMAGES)

// --- Modal ---
const modal = new Modal()

// --- Leaders table ---
const leadersTable = new LeadersTable


// --- page render ---
document.body.append(
    header.element,
    countersPanel,
    gameField.element,
    modal.element,
)

/**
 * start new game
 */
function newGame() {
    modal.close()
    gameField.initCards(CARD_IMAGES)
    movesCounter.reset()
    pairsCounter.reset()
}


// --- events ---
btnNewGame.onClick(newGame)

gameField.onMoves(() => movesCounter.increment())
gameField.onPair(() => pairsCounter.increment())


gameField.onCheckWin(() => {
    if (pairsCounter.value  < 2) {
        return
    }
    leadersTable.pushResult(movesCounter.value)

    const h2 = document.createElement('h2')
    h2.textContent = 'Победа!'

    const result = document.createElement('div')
    result.textContent = `Игра завершена за ${movesCounter.value} ходов`

    const btnNewGameInModal = new Button('Новая игра', 'modal__btn')
    btnNewGameInModal.onClick(newGame)

    const closeBtn = new Button('Закрыть', 'modal__btn')
    closeBtn.onClick(() => modal.close())

    modal.setContent(h2, result, btnNewGameInModal.element, closeBtn.element)
    modal.open()
})

// --- Leader table ---
btnLeaders.onClick(() => {

    const h2 = document.createElement('h2')
    h2.textContent = 'Лучшие результаты!'

    const result = document.createElement('div')
    result.append(leadersTable.tableSize ? leadersTable.element : [])

    const closeBtn = new Button('Закрыть', 'modal__btn')
    closeBtn.onClick(() => modal.close())

    modal.setContent(h2, result, closeBtn.element)
    modal.open()
})