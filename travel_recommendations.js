const resultDiv = document.getElementById("resultField");
const btnSearch = document.getElementById("btnSearch");
const btnReset = document.getElementById("btnReset");

//find local time from search
// const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
// const newYorkTime = new Date().toLocaleTimeString('en-US', options);
// console.log("Current time in New York:", newYorkTime);


function showDestinations(event) {
  event.preventDefault();
  const keyword = document.getElementById("keyword").value.toLowerCase();

//   Check if keyword is empty
  if (!keyword) {
    document.getElementById("resultDiv").style.display = "none";
    alert("Please enter a search term.");
    return; // Exit the function if input is empty
  }

fetch("./travel_recommendation_api.json")
.then((response) => response.json())
.then((data) => {
      let found = false;
      //search in countries
      data.countries.forEach((country) => {
          if (country.name.toLowerCase() === keyword) {
              found = true;
              let timeZone = country.timeZone;
              const options = { timeZone: `${timeZone}`, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                const localTime = new Date().toLocaleTimeString('en-US', options);
              resultDiv.innerHTML += `<button id="timeBlock">Current time in ${timeZone}: ${localTime}</button>`;
              resultDiv.innerHTML += `<h2>Country: ${country.name}</h2>`;
          country.cities.forEach((city) => {
            resultDiv.innerHTML += `
                    <img src="${city.imageUrl}" alt="${city.name}" width="400" />
                    <h3>${city.name}</h3>
                    <p>${city.description}</p>`;
          });
        }
      });
      //search in temples
      if (!found) {
        data.temples.forEach((temple) => {
          if (temple.name.toLowerCase().includes(keyword)) {
            found = true;
            let timeZone = temple.timeZone;
            const options = { timeZone: `${timeZone}`, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const localTime = new Date().toLocaleTimeString('en-US', options);
          resultDiv.innerHTML = `
                    <button id="timeBlock">Current time in ${timeZone}: ${localTime}</button>
                    <img src="${temple.imageUrl}" alt="${temple.name}" width="400" />
                    <h3>${temple.name}</h3>
                    <p>${temple.description}</p>` + `<p>test:  ${keyword}</p>`;
          }
        });
      }
      //search in beaches
      if (!found) {
        data.beaches.forEach((beach) => {
          if (beach.name.toLowerCase().includes(keyword)) {
            found = true;
            let timeZone = beach.timeZone;
            const options = { timeZone: `${timeZone}`, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const localTime = new Date().toLocaleTimeString('en-US', options);
            resultDiv.innerHTML = `
                    <button id="timeBlock">Current time in ${timeZone}: ${localTime}</button>
                    <img src="${beach.imageUrl}" alt="${beach.name}" width="400" />
                    <h3>${beach.name}</h3>
                    <p>${beach.description}</p>`;
          }
        });
      }

      if (!found) {
        resultDiv.innerHTML = "Destination not Found.";
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
      resultDiv.innerHTML = "Error occurred while fetching data.";
    });
}

function resetDestinations() {
  resultDiv.innerHTML = "";
  document.getElementById("keyword").value = "";
}

btnSearch.addEventListener("click", showDestinations);
btnReset.addEventListener("click", resetDestinations);
