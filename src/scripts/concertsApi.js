const concertSearch = id => {
  let resultIndex = 1;
  //to stop adding result every time click(for replace the result)
  const concertElement = document.querySelector("#resultsContainer");
  concertElement.innerHTML = "";
  //fetching datas from API
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events/?apikey=${concertAPIToken}&city=nashville&genreId=${id}`,
    {
      headers: {
        Accept: "application/json"
      }
    }
  )
    .then(results => results.json())
    .then(parsedResults => {
      console.log(parsedResults);
      let events = parsedResults._embedded.events.slice(0, 5);
      events.forEach(event => {
        //giving a path to my result
        event.date = event.dates.start.dateTime;

        let concertResultsAsHTML = concertResultFactory(event, resultIndex);
        concertResultsToDom(concertResultsAsHTML);
        resultIndex++;
      });
      //click(search concert btn) for get a search result
      document.querySelectorAll(".concertSearchBtn").forEach(element => {
        element.addEventListener("click", event => {
          concertSaveToDOM(event);
        });
      });
    });
};
//click(save btn for Itinerary)
document.querySelector("#concertSearchBtn").addEventListener("click", () => {
  const concertSearchSelection = document.querySelector("#concertSelectionMenu")
    .value;
  concertSearch(concertSearchSelection);
});

// making my concertFactory
function concertResultFactory(event, index) {
  return `
    <div class="returnedConcertSearch">
  <section>${index}. <span class="concertResultToSave">

  ${event.name}: ${event.date}</span> 
  <button type="button" class="concertSearchBtn">Save Concert</button>
  </section>
  </div>`;
}

// print a result on dom or html
concertResultsToDom = concertResultsAsHTML => {
  const concertResultElement = document.querySelector("#resultsContainer");
  concertResultElement.innerHTML += concertResultsAsHTML;
};

//selects element to print SAVED ITINERARY to html
concertSaveToDOM = event => {
  //current selection from menu that is selected from resultsFactory
  let concertCurrentButton = event.currentTarget;
  //container that the current button is housed in (Returned Park Search)
  let concertButtonContainer = concertCurrentButton.parentNode;
  //grabs innerHtml of Park Result To Save (name and address)
  let concertSaveSelected = concertButtonContainer.querySelector(
    ".concertResultToSave"
  ).innerHTML;
  //Prints parkSaveSelected to innerHTML
  const concertSaveElement = document.querySelector("#concertItinerary");
  concertSaveElement.id = "concertItinerary";
  concertSaveElement.innerHTML = "Concert: " + concertSaveSelected;
};
