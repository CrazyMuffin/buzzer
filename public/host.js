const socket = io()
const active = document.querySelector('.js-active')
const buzzList = document.querySelector('.js-buzzes')
const clear = document.querySelector('.js-clear')
const dailyd = document.querySelector('.js-dailyd')
const theme = document.querySelector('.js-theme')

socket.on('active', (numberActive) => {
  active.innerText = `${numberActive} joined`
})

let audio = new Audio()

const playAudio = (file) => {
  audio.pause()
  audio.currentTime = 0
  audio = new Audio(file)
  audio.type = 'audio/wav'
  audio.play()
}

socket.on('buzzes', (buzzes) => {
  if (buzzes.length === 1) {
    playAudio('./snd-buzzer.mp3')
  }
  buzzList.innerHTML = buzzes
    .map(buzz => {
      const p = buzz.split('-')
      return {name: p[0], team: p[1]}
    })
    .map(user => `<li>${user.name} on Team ${user.team}</li>`)
    .join('')
})

clear.addEventListener('click', () => {
  socket.emit('clear')
})

dailyd.addEventListener('click', () => {
  playAudio('./snd-dailyd.mp3')
})

theme.addEventListener('click', () => {
  playAudio('./snd-theme.mp3')
})

