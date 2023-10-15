// const container = document.getElementById('container');
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');


populateUI();


let ticketPrice = +movieSelect.value;


// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('moviePrice', moviePrice);
}





// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Copy selected seats
    // Map through array
    // return a new array indexes

    // const seatsIndex = [...selectedSeats].map(function(seat) {
    //     return [...seats].indexOf(seat)
    // }
        
    // );

    // both do the same code but down below is shorterthan above
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)
            
    );
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    console.log(seatsIndex);

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    // console.log(selectedSeats);

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}





//Movie Select event

movieSelect.addEventListener('change',e => {
    ticketPrice = +e.target.value;
    // console.log(e.target.selectedIndex,e.target.value);
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
});



// Gives the class of the element Event Listener(div,li,table. etc)
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
    {
        e.target.classList.toggle('selected');

        updateSelectedCount();
        // console.log(e.target)
    }
    // console.log(e.target);
})

console.log(typeof ticketPrice);


updateSelectedCount();