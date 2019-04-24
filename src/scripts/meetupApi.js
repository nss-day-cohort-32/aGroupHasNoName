
const meetupSearch = (id) => {
    //start a counter to add to the front of the result
    let resultIndex = 1
    //take the value of the selected option and pass it into the fetch call
    fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=nashville&categories=${id}`, {
        headers: {
            "Authorization": `Bearer ${meetupToken}`,
            mode: "cors"
        }
    })
        .then(results => results.json())
        .then(parsedResults => {
            //go to the events array and return the first 5
            let events = parsedResults.events.slice(0, 5)
            //loop through each event and post it to the Search Results area
            events.forEach(event => {
                event.name = event.name.text
                event.date = event.start.local

                //take the result of eventFactory and run it through resultsToDom
                let meetupHTML = eventFactory(event, resultIndex)
                resultsToDom(meetupHTML)
                resultIndex++
            })
            //make an event listener for each search result button
            const saveBtn = document.querySelectorAll('.meetupSaveBtn')
            saveBtn.forEach(button => {
                button.addEventListener('click', (event => {
                    resultsToItinerary(event)
                }))
            })
        })
}

//create HTML from the search information
eventFactory = (event, index) => {
    let year = event.date.slice(0, 4)
    let month = event.date.slice(5, 7)
    let day = event.date.slice(8, 10)
    let time = event.date.slice(11, 16)

    return `
    <div class="returnedMeetupSearch"
    <p>${index}. <span class="eachResult">${event.name} on ${month}-${day}-${year} at ${time}</span> <button class="meetupSaveBtn">Save</button></p>
    </div>
    `
}

//take the value from the search option and pass it into the fetch call
document.querySelector('#meetupSearchBtn').addEventListener('click', () => {
    const categoryId = document.querySelector('#meetupSelectionMenu').value
    meetupSearch(categoryId)
    document.querySelector('#resultsContainer').innerHTML = ""
})

//take the search results and put them in the results conatiner
resultsToDom = result => {
    let container = document.querySelector('#resultsContainer')
    container.innerHTML += result
}

//take the saved event and put it in the meetup itinerary div
resultsToItinerary = result => {
    let currentBtn = result.currentTarget
    let currentContainer = currentBtn.parentNode
    let eventToSave = currentContainer.querySelector('.eachResult').innerHTML
    const itineraryContainer = document.querySelector('#meetupItinerary')
    itineraryContainer.innerHTML = `Meetup: ${eventToSave}`
}