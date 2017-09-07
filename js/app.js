/*
 * Create a list that holds all of your cards
 */

//card 1 and card 14 should match 

//card object definition
let Card = function(item) {

  //this.html = `<li class="${this.visible}"><i class="${this.symbol}"></i></li>`;

  //create element to bind
  this.element = document.createElement("li");
  this.element.setAttribute("class", item.className);

  //create <i> child element
  this.innerElement = document.createElement("i");
  this.innerElement.setAttribute("class", item.children[0].className);
  this.element.appendChild(this.innerElement);

  //add it to the dom
  document.getElementsByClassName("deck")[0].appendChild(element);
};

Card.prototype.handleEvent = function(e) {
    switch (e.type) {
        case "click": this.click(e);
    }
}

Card.prototype.click = function(e) {
    // do something with this.element...
    if (!this.element.className.match(/\sopen show/)) {
		this.element.className += " open show";
	} 
	else {
		this.element.className = this.element.className.replace(" open show","");
	}

	alert("clicked");
}


Card.prototype.checkMatch = function(comparisonObj) {
	if (this.element.children[0].className === comparisonObj.element.children[0].className) {
		this.element.className += " match";
		comparisonObj.element.className += " match";
		return true;
	} else {
		return false;
	}
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//create array of card objects
let cards = Array.prototype.slice.call(document.getElementsByClassName("card")).map(function(val){
	new Card(val);
});

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
	//shuffle the cards
	let shuffledCards = shuffle(cards);
	//render the deck
	cards = shuffledCards;
	render(cards);
}

function render(deck) {
	//create the html out of the deck and update it
	document.getElementsByClassName("deck")[0].innerHTML = deck.reduce(function(acc,val){
		acc += val.html;
		return acc;
	},"");
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
/*
document.getElementsByClassName("restart")[0].addEventListener("click",function(e){
	e.preventDefault();
	shuffleDeck();
});

document.getElementsByClassName("deck")[0].addEventListener("click",function(e){
	e.preventDefault();
	console.log(e.target);
	e.target.addClass(" open show");
}) */

//jquery

$(document).ready(function(){
	//when restart is clicked
	$(".restart").click(function(e){
		e.preventDefault();
		shuffleDeck();
	});

	$(".deck").html("");

	$(".card").each(function(obj){
		new Card(obj);
	});
});