//gets the api
function parkSearch() {
  //div where results are printed
  const parkElement = document.querySelector("#resultsContainer");
  parkElement.innerHTML = "";
  //results counter
  let parkResultsCounter = 1;
  //selects value in drop down menu
  const parkSearchSelection = document.querySelector("#parkSelectionMenu").value;
  //complete API url with no paramenters
  const parkURL = "https://data.nashville.gov/resource/74d7-b74t.json";
  let parkParamaterOnURL = ""
  //if the park search selection is not blank, then return filtered results
  if (parkSearchSelection !== "none") {
    parkParamaterOnURL = "?" + parkSearchSelection + "=Yes";
  }
  fetch(parkURL + parkParamaterOnURL, {
    headers: {
      Accept: "application/json",
      "X-App-Token": `${parkAPIKey}`
    }
  })
  .then(parkActivity => parkActivity.json())
  .then(parsedParkActivity => {
    //slice takes items from the parsed Park Activity array and puts them in a new array called new Park Activity List, but only the first 5
    var newParkActivityList = parsedParkActivity.slice(0, 5);
    //new array sliced from the previous
    newParkActivityList.forEach(parkFeature => {
      const parkResultsAsHTML = parkResultsFactory(parkFeature, parkResultsCounter);
      parkResultsToDOM(parkResultsAsHTML);
      parkResultsCounter++;
    });
    //adds event to created save button and prints to html
    document.querySelectorAll(".saveParkSearchBtn").forEach(element => {
      //event has to attach to something that's already printed to the DOM (parkResultsToDOM and by extention parkResultsFactory which includes the button that the listener event is placed on. the forEach attaches the listener to multiple buttons.)
      element.addEventListener("click", (event) => parkSaveToDOM(event));
    });
  });
}

//selects button on html
const parkSearchButton = document.querySelector("#parkSearchBtn");

//add listener for park Search function
parkSearchButton.addEventListener("click", () => parkSearch());

//returns park item in the RESULTS html
parkResultsFactory = (parkFeature, parkResultsCounter) => {
  //parses the humman-address in the API object
  const location = JSON.parse(parkFeature.mapped_location.human_address);
  return ` 
  <div class="returnedParkSearch">
  <section>${parkResultsCounter}. <span class="parkResulToSave">
  ${parkFeature.park_name}: ${location.address}</span> 
  <button type="button" class="saveParkSearchBtn">Save Park</button>
  </section>
  </div>
  `;
};

//selects element to print RESULTS to html
parkResultsToDOM = parkResultsAsHTML => {
  const parkResultElement = document.querySelector("#resultsContainer");
  parkResultElement.innerHTML += parkResultsAsHTML;
};

//selects element to print SAVED ITINERARY to html
parkSaveToDOM = (event) => {
  //current selection from menu that is selected from resultsFactory
  let parkCurrentButton = event.currentTarget;
  //container that the current button is housed in (Returned Park Search)
  let parkButtonContainer = parkCurrentButton.parentNode;
  //grabs innerHtml of Park Result To Save (name and address)
  let parkSaveSelected = parkButtonContainer.querySelector(".parkResulToSave").innerHTML;
  //Prints parkSaveSelected to innerHTML
  const parkSaveElement = document.querySelector("#parkItinerary");
  parkSaveElement.innerHTML = "Park: " + parkSaveSelected;
};