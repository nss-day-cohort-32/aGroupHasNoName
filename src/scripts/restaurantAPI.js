console.log("restuarantAPI")

let factory;

//fetch to the server to bring back restaurants by cuisines

function restaurantsearch (cuisines) {
    let counter = 1;
    fetch(`https://developers.zomato.com/api/v2.1/search?city_id=1138&cuisines=${cuisines}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "user-key" : `${restaurantKey}`
        }
    })
    .then(response => response.json())
    .then(parsedRestaurants => {
        let restaurants = parsedRestaurants.restaurants.slice(0, 5)
        restaurants.forEach(restaurant => {
            restaurant.name = restaurant.restaurant.name;
            restaurant.address = restaurant.restaurant.location.address;
            let restaurantHTML = restaurantFactory(restaurant, counter)
            restaurantToDom(restaurantHTML);
            counter ++;
        })
        const saveBtn = document.querySelectorAll(".restuarantSaveBtn")
        saveBtn.forEach( button => {
            button.addEventListener("click", ( event => {
            restaurantToItinerary(event)
            }
            ))
        })
    })
}

//created the HTML to be pushed to the DOM

function restaurantFactory (restaurant, counter) {
    return `<div class="restaurantResults">
    <p>${counter}. <span class="eachResult">${restaurant.name}: ${restaurant.address}</span><button class="restuarantSaveBtn">SAVE</button></p>
    </div>
    `
}

//pushes html to the dom

function restaurantToDom(toBeAdded){
    document.getElementById("resultsContainer").innerHTML += toBeAdded;
}

//add restaurant to saved itinerary

function restaurantToItinerary (result) {
    let currentBtn = result.currentTarget
    let currentContainer = currentBtn.parentNode
    let restaurantToSave = currentContainer.querySelector(".eachResult").innerHTML
    const itineraryContainer = document.querySelector("#restaurantItinerary")
    itineraryContainer.innerHTML = `Restaurant: ${restaurantToSave}`
}


// main.js portion

let restaurantSearch = document.getElementById("restaurantSearchBtn");

restaurantSearch.addEventListener("click", () => {
  let cuisines = document.getElementById("restaurantSelectionMenu").value;
  document.querySelector("#resultsContainer").innerHTML= "";
  restaurantsearch(cuisines);
    })




