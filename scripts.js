const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let clicks = 0; 


function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard){
      hasFlippedCard = true;  
      firstCard = this;
      clicks +=1;
      updateCounter();
      return;
   }
  
  secondCard = this;
  clicks +=1;

  updateCounter();
  checkForMatch();
}

function checkForMatch(){
    if (firstCard.dataset.framework === secondCard.dataset.framework){
        disableCards();
        return;
    }

  unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function newGame(){
    document.location.reload();
}

function updateCounter(){
    var counter = document.getElementById("counterNum");
    counter.removeChild(counter.firstChild);
    var num = document.createTextNode(clicks);
    counter.appendChild(num);
}

(function shuffle(){
    cards.forEach(function(card){
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
