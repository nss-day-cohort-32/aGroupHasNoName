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

gloablItineraryButton = () => {
    let parkInfo = document.querySelector("#parkItinerary").innerText;
    let concertInfo = document.querySelector("#concertItinerary").innerText;
    let resturantInfo = document.querySelector("#restaurantItinerary").innerText;
    let meetupInfo = document.querySelector("#meetupItinerary").innerText;
    if (parkInfo !== "" && concertInfo !== "" && resturantInfo !== "" && meetupInfo !== "") {
      let itineraryButtonContainer = document.querySelector(
        "#saveItineraryContainer"
      );
      itineraryButtonContainer.innerHTML =
        "<button type=\"button\" id=\"saveToJSONButton\">Save Itinerary</button>";
      document.querySelector("#saveToJSONButton").addEventListener(
        "click", () => {
        postNewData("http://localhost:8088/Itinerary", {
          park: parkInfo,
          concert: concertInfo,
          resturant: resturantInfo,
          meetup: meetupInfo
        })
      });
    }
  };
