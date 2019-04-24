let parkInfo = document.querySelector("#parkItinerary")


function postNewData(url, data) {
    console.log("postData")
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(parsedData => {
        console.log(parsedData)

    })
}

if (parkInfo.innerText !== "") {
    // let itinerayBtn = document.querySelector("#saveItineraryContainer")

    // let saveItinerary = document.createElement("button");
    // saveItinerary.id = "saveItineraryBtn";
    // saveItinerary.textContent = "Save Itinerary";

    // document.querySelector("#saveItineraryContainer").parentNode.appendChild(saveItinerary)
}

postNewData("http://localhost:8088/Itinerary", {park: parkInfo})
