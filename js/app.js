/*
 * Create a list that holds all of your cards
 */

let cards = Array.prototype.slice.call(document.getElementsByClassName("card"));


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleDeck() {
	//convert arraynode to array
	let cards = Array.prototype.slice.call(document.getElementsByClassName("card"));
	//shuffle the cards
	let shuffledCards = shuffle(cards);
	//generated the html
	let shuffledCardsHTML = shuffledCards.reduce(function(acc,val){
		acc += `<li class="${val.className}"><i class="${val.children[0].className}"></i></li>`;
		return acc;
	},"");
	//added the html
	document.getElementsByClassName("deck")[0].innerHTML = shuffledCardsHTML;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
/*
TO DOs : create click event listener logic
*/

//restart button
document.getElementsByClassName("restart")[0].addEventListener("click",function(e){
	e.preventDefault();
	shuffleDeck();
});

document.getElementByClassName("card").addEventListener("click",function(e){
	e.preventDefault();
	console.log(this);
})