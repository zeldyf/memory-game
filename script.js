const gameContainer = document.getElementById('game');

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

function shuffle(array) {
	let counter = array.length;
	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);
		counter--;
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

function createDivsForColors(colorArray) {
	for (let i = 0; i < colorArray.length; i++) {
		const newDiv = document.createElement('div');
		newDiv.classList.add(colorArray[i]);
		newDiv.setAttribute('id', i + 1);
		gameContainer.append(newDiv);
		newDiv.addEventListener('click', handleCardClick);
	}
}

let shuffledColors = shuffle(COLORS);

let cardBack = 'white';
let clickedCard = null;
let clickedClass = null;
let color = '';
let cardsFlipped = 0;

let matchesFound = 0;
let moveCounter = 0;

function styleCard() {
	color = event.target.classList.value;
	event.target.style.backgroundColor = color;
}

// TODO: Implement this function!
function handleCardClick(event) {
	styleCard();
	cardsFlipped++;
	if (cardsFlipped === 1) {
		clickedCard = event.target;
		clickedClass = event.target.classList.value;
	} else if (cardsFlipped === 2) {
		if (clickedCard.id !== event.target.id) {
			color = event.target.classList.value;
			if (color === clickedClass) {
				cardsFlipped = 0;
				matchesFound++;
				moveCounter++;
				if (matchesFound === shuffledColors.length / 2) {
					setTimeout(function() {
						alert(`You won in ${moveCounter} moves!`);
					}, 500);
				}
			} else if (color !== clickedClass) {
				moveCounter++;
				cardsFlipped = 0;
				setTimeout(function() {
					event.target.style.backgroundColor = cardBack;
					clickedCard.style.backgroundColor = cardBack;
				}, 1000);
			}
		} else {
			clickedCard.style.backgroundColor = cardBack;
			cardsFlipped = 0;
		}
}
}

// when the DOM loads
createDivsForColors(shuffledColors);
