
// tip: in windoiws, press 'win' + '.' to open emojis keyboard

//TODO: -- implementar ids ou classes nos cards para fazer as comparações, bem melhor que trabalhar com innerHTML

const cards = [
  "😱",
  "😱",
  "🤡",
  "🤡",
  "👽",
  "👽",
  "🙈",
  "🙈",
  "🦎",
  "🦎",
  "🐳",
  "🐳",
]
let openCards = []

let matchedCards = []

cards.sort(() => (Math.random()>0.5?1:-1))



for(const [index, element] of Object.entries(cards)) {
  let cardEl = document.createElement("div")
  cardEl.classList.add('card')
  cardEl.onclick = handleCardClick
  cardEl.innerHTML = element
  const gameplay = document.querySelector('.gameplay')
  gameplay.appendChild(cardEl)  
  cardEl.id=`${index}-${cardEl.innerHTML}`
}



function handleCardClick(event) {
  if(openCards.length<2) {
    if(openCards.length == 1) {
      for (const card of openCards) {
        if(card.id==this.id) {
          cleanAllOpenCards()
          return;
        }
      }
    } 
    this.classList.add("openCard")
    openCards.push(this)
  }
  if(openCards.length == 2) {
    checkMatch()
  } 
  }


function checkMatch() {
  const isMatch = openCards.reduce((prev, next) => getPairId(prev)==getPairId(next))

  if(openCards.length==2 && isMatch) {
    alert(`isMatch!  ${openCards[0].innerHTML} ${openCards[1].innerHTML}`)
    openCards[0].classList.add('matchedCard')
    matchedCards.push(openCards[0])
    openCards[1].classList.add('matchedCard')
    matchedCards.push(openCards[1])
  }
  cleanAllOpenCards()
  console.log(matchedCards.length, cards.length)
  if(matchedCards.length==cards.length) {
    // TODO: change this alert for a customized view
    setTimeout(() => {
      alert('You Win!!')
      endGame()
    }, 1000)
  }
}

function cleanAllOpenCards() {
  const openCardsEls = [...openCards]
  setTimeout(() => {
    openCardsEls.forEach(el => {
      el.classList.remove('openCard')
    })
  }, 1000)
  openCards = []
}

function cleanAllMatchedCards() {
  matchedCards.forEach(el => {
    el.classList.remove('matchedCard')
  })
  matchedCards = []
}

function getPairId(el) {
  return el.id.split('-')[1]
}

// Posso aproveitar essa função para qquando for colocar níveis e fases, não precisa necessariamente resetar - criar uma transição de level instead
function endGame() {
  resetGame()
}
function resetGame() {
  cleanAllMatchedCards()
  cards.sort(() => (Math.random()>0.5?1:-1))
}

