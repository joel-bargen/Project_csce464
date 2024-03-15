const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const btn = document.querySelector('button')

btn.addEventListener("click", function() {
  if(btn.textContent == "Simple") {
    this.textContent = "Hard"
  } else {
    this.textContent = "Simple"
  }

  clearInterval(timerId)
  moveMole()
})

let result = 0
let hitPosition
let currentTime = 60
let timerId = null

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole')
  })

  let randomSquare = squares[Math.floor(Math.random() * 9)]
  randomSquare.classList.add('mole')

  hitPosition = randomSquare.id
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++
      score.textContent = result
      hitPosition = null
    }
  })
})

function moveMole() {
  if (btn.textContent == "Simple") {
    timerId = setInterval(randomSquare, 1000)
  } else if (btn.textContent == "Hard") {
    timerId = setInterval(randomSquare, 500)
  }
}

moveMole()

function countDown() {
 currentTime--
 timeLeft.textContent = currentTime

 if (currentTime == 0) {
   clearInterval(countDownTimerId)
   clearInterval(timerId)
   alert('GAME OVER! Your final score is ' + result)
 }

}

let countDownTimerId = setInterval(countDown, 1000)