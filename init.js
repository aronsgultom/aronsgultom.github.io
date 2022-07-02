// declaring element
const username = document.getElementById("username")
const registerForm = document.getElementById("registerForm")
const logoutForm = document.getElementById("logoutForm")
const startSection = document.getElementById("start")
const box1 = document.getElementById("box1")
const box2 = document.getElementById("box2")
const box3 = document.getElementById("box3")
const rewardImage = document.getElementById("imgReward")

const player = new Player()

let default_option = ['😍', '🤣', '😱']
box1.textContent = default_option[0]
box2.textContent = default_option[1]
box3.textContent = default_option[2]

function dice() {
  let gacha = []
  for (let i = 0; i < default_option.length; i++) {
    const roll = default_option[~~(Math.random() * default_option.length)]
    gacha.push(roll)
  }
  return gacha
}

function reward() {
  fetch('https://zoo-animal-api.herokuapp.com/animals/rand').then(x => x.json()).then(result => {
    //set nama hadiah reward
    let text = document.createElement('h1')
    text.textContent = result.name

    //set gambar hadiah
    let img = new Image(200, 200)
    img.src = result.image_link

    //set element
    rewardImage.appendChild(img)
    rewardImage.appendChild(text)
  })
}

function winner() {
  if (box1.textContent == box2.textContent && box1.textContent == box3.textContent) {
    reward()
    location.href = "#reward"
  } else {
    console.log('lose')
  }
}

function start() {
  //selama
  const rolling = setInterval(function () {
    const result = dice()
    box1.textContent = result[0]
    box2.textContent = result[1]
    box3.textContent = result[2]
  }, 70)

  //ketika
  setTimeout(function () {
    clearInterval(rolling)
    winner()
  }, 2500)

}

onload = function () {
  const token = sessionStorage.getItem('token')

  if (token && token != null) {
    registerForm.style.display = "none"
    logoutForm.style.display = "block"
  } else {
    registerForm.style.display = "block"
    logoutForm.style.display = "none"
  }
}

function register() {
  player.username = username.value
  player.register
}

function logout() {
  player.logout
}