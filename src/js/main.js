import { Header } from './components/Header.js'
import { GameField } from './components/GameField.js'

const header = new Header()
document.body.appendChild(header.element)

const gameFiled = new GameField()
document.body.appendChild(gameFiled.element)