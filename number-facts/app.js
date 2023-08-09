// Initialize DOM elements
const container = $('div.container');
const minNumber = $('input.min-value');
const maxNumber = $('input.max-value');
const rangeButton = document.querySelector('button.range-facts');
const favoriteNumber = $('input.favorite-number');
const fourButton = document.querySelector('button.four-facts');
const factList = $('ul.facts');
const fact = document.querySelector('li');

// Uses async and await to return an array consisting of one fact for each number in a range.
async function getRangeFacts(min, max){
    const rangeFacts = [];

    for (let i = min; i <= max; i++){
        let newRequest = await axios.get(`http://numbersapi.com/${i}?json`);
        let fact = newRequest.data.text;
        rangeFacts.push(fact);
    }

    return rangeFacts;
}

// Uses async and await to return an array consisting of four facts for one number.
async function getFourFacts(num){
    const favoriteFacts = [];

    for (let i=1; i<5; i++){
        let newRequest = await axios.get(`http://numbersapi.com/${num}?json`);
        let fact = newRequest.data.text;
        favoriteFacts.push(fact);
    }

    return favoriteFacts;
}

// Accepts an array of facts and appends each fact to the list.
function appendLi(arr){
    for (let a of arr){
        console.log(a)
        factList.append(`<li>${a}</li>`)
    }
}

// Functionality for the "four-facts" button
fourButton.addEventListener('click', async function(e){
    e.preventDefault();
    if(document.querySelector('li')){
        while(document.querySelector('li')){
            document.querySelector('li').remove()
        }
    }
    let response = await getFourFacts(favoriteNumber.val());
    appendLi(response);
})

// Functionality for the "range-facts" button
rangeButton.addEventListener('click', async function(e){
    e.preventDefault();
    if(document.querySelector('li')){
        while(document.querySelector('li')){
            document.querySelector('li').remove()
        }
    }
    if(minNumber.val() < maxNumber.val() && minNumber.val() && maxNumber.val()){
        let response = await getRangeFacts(minNumber.val(), maxNumber.val());
        appendLi(response);
    }
    else{
        console.log("Please provide a valid min and max numbers")
    }
})