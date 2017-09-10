//initial setup
let data = [
	
	{icon: "fa fa-diamond", class: "card"},
	{icon: "fa fa-paper-plane-o", class: "card"},
	{icon: "fa fa-anchor", class: "card"},
	{icon: "fa fa-cube", class: "card"},
	{icon: "fa fa-bolt", class: "card"},
	{icon: "fa fa-anchor", class: "card"},
	{icon: "fa fa-leaf", class: "card"},
	{icon: "fa fa-bicycle", class: "card"},
	{icon: "fa fa-diamond", class: "card"},
	{icon: "fa fa-bomb", class: "card"},
	{icon: "fa fa-leaf", class: "card"},
	{icon: "fa fa-bomb", class: "card"},
	{icon: "fa fa-bolt", class: "card"},
	{icon: "fa fa-bicycle", class: "card"},
	{icon: "fa fa-paper-plane-o", class: "card"},
	{icon: "fa fa-cube", class: "card"}

];

let moves = 0;
let usedCards = [];

//create all utility functions
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

//these functions are from stack overflow (https://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript)
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

//timer object

let Timer = function() {
	this.currentTime = Date.now();
	this.startTime = this.currentTime;
	this.distance = this.startTime - this.currentTime;
	this.running = false;
	
	this.displayTime();

};

//timer methods:

//start the timer
Timer.prototype.start = function() {
	//prevent multiple setInterval
	if (this.running) return;

	this.running = true;
	this.startTime = Date.now();

	this.intervalID = setInterval(

		(function(self){
		return function(){
			self.displayTime();
		}
	})(this),1000);
};

//stop the timer
Timer.prototype.stop = function() {

	clearInterval(this.intervalID);
	this.running = false;
	this.displayTime();
};

//reset the timer
Timer.prototype.reset = function() {
	this.stop();
	this.startTime = Date.now();
	this.displayTime();
}

//render the timer to the screen
Timer.prototype.displayTime = function() {
	this.currentTime = Date.now();
	this.distance = this.currentTime - this.startTime;

	days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
	hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
	seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

	//format hh:mm:ss
	if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    this.formattedTime = `${hours}:${minutes}:${seconds}`;
    document.getElementsByClassName("timer")[0].innerHTML = this.formattedTime;
};

let time = new Timer();

//moves panel object

let Move = function() {
	this.moves = 0;
	this.singular = "Move";
	this.plural = "Moves";
	this.display();
}

Move.prototype.display = function() {
	document.getElementsByClassName("moves")[0].innerHTML = (this.moves === 1) ? (this.moves + " " + this.singular) : (this.moves + " " + this.plural);
}

Move.prototype.update = function() {
	this.moves++;
	this.display();
}

Move.prototype.reset = function() {
	this.moves = 0;
	this.display();
}

let move = new Move();

//stars object definition

let Star = function(num) {
	this.num = num;
	this.singular = "Star";
	this.plural = "Stars";
	this.display();

};

Star.prototype.display = function() {

	for (let i = 0; i < this.num; i++) {
		this.element = document.createElement("li");
		this.element.setAttribute("class", "gold-star");
		this.innerElement = document.createElement("i");
		this.innerElement.setAttribute("class", "fa fa-star");
	    this.element.appendChild(this.innerElement);
	    document.getElementsByClassName("stars")[0].appendChild(this.element);
	} 
};

Star.prototype.removeStar = function() {
	let goldStars = document.getElementsByClassName("gold-star");
	removeClass(goldStars[goldStars.length - 1],"gold-star");

};

Star.prototype.reset = function() {
	this.num = 3;
	for (let i = 0; i < this.num; i++) {
		addClass(document.getElementsByClassName("stars")[0].getElementsByTagName("li")[i],"gold-star");
	}
};

let stars = new Star(3);

//card object definition
let Card = function(item) {

  //create element to bind
  this.element = document.createElement("li");
  this.element.setAttribute("class", item.class);

  //create <i> child element
  this.innerElement = document.createElement("i");
  this.innerElement.setAttribute("class", item.icon);
  this.element.appendChild(this.innerElement);
  //add it to the dom
  document.getElementsByClassName("deck")[0].appendChild(this.element);
  //add event listener
  this.element.addEventListener("click", this, false);

};

//link up the card prototype to the click
Card.prototype.handleEvent = function(e) {
    switch (e.type) {
        case "click": this.click(e);
    }
};

Card.prototype.click = function(e) {
	//prevent default page refresh behavior
	e.preventDefault();

	//start the timer
	time.start();

	//set default for last element clicked for first ever click
	window.lastElementClicked = window.lastElementClicked || "none";
	
    // do something with this.element...
   	if (!this.element.classList.contains("match")) {

   		if (hasClass(this.element,"open") && hasClass(this.element,"show")) {
   			removeClass(this.element, "open");
			removeClass(this.element, "show");
			window.lastElementClicked = "none";

   		}
   		else {
   			addClass(this.element, "open");
   			addClass(this.element, "show");
   			//check the symbols of the two cards only if a previous card has been clicked
			if (window.lastElementClicked !== "none") {
				//check if it's a match
				if (window.lastElementClicked.childNodes[0].className === this.innerElement.className) {
					addClass(window.lastElementClicked, "match");
					addClass(this.element, "match");
					usedCards.push(window.lastElementClicked,this.element);
					window.lastElementClicked = "none";
					move.update();
				}
				//since it's not a match we're going to flip these back over after 1 second so player can see card
				else {
					let that = this;
					let lastElement = window.lastElementClicked;
					setTimeout(function(){
						removeClass(that.element, "open");
						removeClass(that.element, "show");
						removeClass(lastElement, "open");
						removeClass(lastElement, "show");
						window.lastElementClicked = "none";
					},500);
					move.update();
				}
			}
			else {
				//set the last element clicked to the current element for next click
   				window.lastElementClicked = event.target; 
			}
   		}

   		//stars system
   		switch (stars.num) {
   			case 3:
   				if ((move.moves) >= 10 && (move.moves < 15)) {
   					stars.removeStar();
   					stars.num--;
   				}
   				break;
   			case 2:
   				if ((move.moves >= 15) && (move.moves < 25)) {
   					stars.removeStar();
   					stars.num--;
   				}
   				break;
   		}
   


		//game winning condition check
		if (usedCards.length === data.length) {
			//stop the timer
			time.stop();
			//win message
			swal({
				title: `Congratulations, you won!`,
				text: `Your time is ${time.formattedTime}. You took ${move.moves} moves, and you got ${stars.num} ${(stars.num === 1) ? stars.singular : stars.plural}.`,
				type: 'success',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Play again?'
				}).then(function () {
					document.getElementsByClassName("restart")[0].click();
				});
			//reset to defaults
			window.lastElementClicked = "none";
			gameOver = true;
		}
   }
   //show alert if card has already been matched 
   else {
     swal({
     	title: "You've already matched this card!",
     	text: "Pick another card.",
     	type: 'warning',
     	showCancelButton: false,
		showConfirmButton: false,
     	timer: 1250
     }).then(
     	function(){},
     	function(dismiss) {
     		if (dismiss == "timer") {
     			console.log("close the timer");
     		}
     	}
     );
   }

};

//jquery

$(document).ready(function(){

	function newGame() {
		time.reset();
		move.reset();
		stars.reset();
		usedCards = [];
		data = shuffle(data);
		data.forEach(function(obj){
			new Card(obj);
		});
	}

	//when restart is clicked
	$(".restart").click(function(e){
		e.preventDefault();
		$(".deck").empty();
		newGame();
	
	});

	newGame();

});