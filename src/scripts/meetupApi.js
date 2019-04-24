const meetupSearch = (id) => {
    let resultIndex = 1
    fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=nashville&categories=${id}`, {
        headers: {
            "Authorization": `Bearer ${meetupToken}`,
            mode: "cors"
        }
    })
        .then(results => results.json())
        .then(parsedResults => {
            // console.log(parsedResults.events)
            let events = parsedResults.events.slice(0, 5)
            events.forEach(event => {
                console.log(event.name.text)
                console.log(event.start.local)
                event.name = event.name.text
                event.date = event.start.local


                let meetupHTML = eventFactory(event, resultIndex)
                resultsToDom(meetupHTML)
                resultIndex++
            })
            const saveBtn = document.querySelectorAll('.meetupSaveBtn')
            saveBtn.forEach(button => {
                button.addEventListener('click', (event => {
                    resultsToItinerary(event)
                }))
            })
        })
}

// meetupSearch()

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

document.querySelector('#meetupSearchBtn').addEventListener('click', () => {
    const categoryId = document.querySelector('#meetupSelectionMenu').value
    meetupSearch(categoryId)
    document.querySelector('#resultsContainer').innerHTML = ""
})

resultsToDom = result => {
    let container = document.querySelector('#resultsContainer')
    container.innerHTML += result
}

resultsToItinerary = result => {
    let currentBtn = result.currentTarget
    let currentContainer = currentBtn.parentNode
    let eventToSave = currentContainer.querySelector('.eachResult').innerHTML
    const itineraryContainer = document.querySelector('#meetupItinerary')
    itineraryContainer.innerHTML = `Meetup: ${eventToSave}`
}