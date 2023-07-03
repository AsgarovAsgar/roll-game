'use strict'

const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')
const scorePlayer0 = document.querySelector('#score--0')
const scorePlayer1 = document.querySelector('#score--1')
const currentScorePlayer0 = document.querySelector('#current--0')
const currentScorePlayer1 = document.querySelector('#current--1')


const diceEl = document.querySelector('.dice')
// BUTTONS
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')
const btnRoll = document.querySelector('.btn--roll')


// WHEN GAME STARTS
let currentScore, activePlayer, totalScores, playing

function init() {
  currentScore = 0
  activePlayer = 0
  totalScores = [0, 0]
  playing = true

  scorePlayer0.textContent = 0
  scorePlayer1.textContent = 0
  currentScorePlayer0.textContent = 0
  currentScorePlayer1.textContent = 0
  diceEl.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
}
init()

function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0
  currentScore = 0

  if(activePlayer === 0) {
    activePlayer = 1
  } else { activePlayer = 0 }

  // activePlayer = activePlayer === 0 ? 1 : 0 

  player0.classList.toggle('player--active')
  player1.classList.toggle('player--active')
}

btnRoll.addEventListener('click', function() {
  if(!playing) return
  // 1. generate random dice
  const dice = Math.floor(Math.random() * 6) + 1

  // 2. display dice 
  console.log(dice);

  diceEl.classList.remove('hidden')
  diceEl.src = `dice-${dice}.png`

  if(dice !== 1) {
    currentScore = currentScore + dice;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore
  } else {
    switchPlayer()
  }
})


btnHold.addEventListener('click', function() {
  if(!playing) return
  console.log('hold')
  totalScores[activePlayer] = totalScores[activePlayer] + currentScore
  document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer]

  if(totalScores[activePlayer] >= 10) {
    playing = false
    // alert('you win')
    diceEl.classList.add('hidden')
    document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
  } else {
    switchPlayer()
  }
})

btnNew.addEventListener('click', () => {
  init()
})