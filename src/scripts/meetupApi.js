// const categoryId = document.querySelector('.meetupSelectionMenu')

const meetupSearch = () => {
    fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=nashville&categories=106`, {
        headers: {
            "Authorization": `Bearer ${meetupToken}`
        }
    })
	.then(results => results.json())
	.then(parsedResults => {
            // console.log(parsedResults.events)
            let events = parsedResults.events
            events.forEach(event => {
                console.log(event.name.text)
                console.log(event.start.local)
            })
        })

}

meetupSearch()


// ${categoryId}