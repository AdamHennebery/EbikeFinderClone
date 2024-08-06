document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");
    
    const checkboxes = document.querySelectorAll('.checkbox_input');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const checkboxCheck = this.parentNode.querySelector('.checkbox_check');
            if (this.checked) {
                checkboxCheck.style.background = '#38743c';
                checkboxCheck.style.strokeDashoffset = '0';
            } else {
                checkboxCheck.style.background = 'transparent';
                checkboxCheck.style.strokeDashoffset = '-130';
            }
        });
    });
    
    const form = document.getElementById("questionnaireForm");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("Form submitted");
    
        // Collect form data
        const selectedTerrains = Array.from(form.querySelectorAll("input[name='terrain']:checked")).map(input => input.value);
        const selectedFrame = Array.from(form.querySelectorAll("input[name='frame']:checked")).map(checkbox => checkbox.value);
        const selectedMotor = Array.from(form.querySelectorAll("input[name='motor']:checked")).map(checkbox => checkbox.value);
    
        console.log("Selected Terrains:", selectedTerrains); // Log selected terrains
        console.log("Selected Frame:", selectedFrame); // Log selected frames
        console.log("Selected Motor:", selectedMotor); // Log selected motors
    
        // Fetch the bikes from the server
        const bikes = await fetchBikes();
        console.log("Fetched Bikes:", bikes); // Log fetched bikes
        
        // Filter bikes based on selected criteria
        const filteredBikes = filterBikes(bikes, selectedTerrains, selectedFrame, selectedMotor);
        console.log("Filtered Bikes:", filteredBikes); // Log filtered bikes
    
        // Display the filtered bikes
        displayBikes(filteredBikes);
    });
});

function nextQuestion(nextPageId) {
    const currentPage = document.querySelector('.question-page.active');
    const nextPage = document.getElementById(nextPageId);
    currentPage.classList.remove('active');
    nextPage.classList.add('active');
}

async function fetchBikes() {
    try {
        const response = await fetch('http://localhost:3000/bikes');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched bikes data:', data); // Log the fetched data
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

function filterBikes(bikes, selectedTerrains, selectedFrame, selectedMotor) {
    return bikes.filter(bike => {
        const terrainMatch = selectedTerrains.some(terrain => bike.terrains.includes(terrain));
        const frameMatch = selectedFrame.length === 0 || selectedFrame.includes(bike.frame);
        const motorMatch = selectedMotor.length === 0 || selectedMotor.includes(bike.motor);

        console.log('Filtering bike:', bike);
        console.log(' - Terrain match:', terrainMatch);
        console.log(' - Frame match:', frameMatch);
        console.log(' - Motor match:', motorMatch);

        return terrainMatch && frameMatch && motorMatch;
    });
}

function displayBikes(bikes) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h2>Recommended Bikes</h2>";
    resultsDiv.classList.add("results-header");

    console.log("Bikes to display:", bikes); // Log the bikes being displayed

    if (bikes.length === 0) {
        console.log("No bikes found for selected criteria."); // Log if no bikes found
        resultsDiv.innerHTML += "<p>No bikes found for selected criteria.</p>";
    } else {
        const bikeGrid = document.createElement("div");
        bikeGrid.classList.add("bike-grid");

        bikes.forEach(bike => {
            console.log("Displaying bike:", bike); // Log each bike being displayed

            const bikeItem = document.createElement("div");
            bikeItem.classList.add("bike-item");

            const bikeLink = document.createElement("a");
            bikeLink.href = bike.buyURL;
            bikeLink.target = "_blank";

            const bikeImage = document.createElement("img");
            bikeImage.src = bike.image;

            const bikeName = document.createElement("h3");
            bikeName.textContent = bike.name;

            const bikeSpecsContainer = document.createElement("div");

            const motorBatterySpecs = document.createElement("p");
            motorBatterySpecs.textContent = `Motor: ${bike.motor} | Battery: ${bike.specs.battery}`;

            const rangeSpeedSpecs = document.createElement("p");
            rangeSpeedSpecs.textContent = `Range: ${bike.specs.range} | Top Speed: ${bike.specs.topSpeed}`;

            bikeSpecsContainer.appendChild(motorBatterySpecs);
            bikeSpecsContainer.appendChild(rangeSpeedSpecs);

            bikeLink.appendChild(bikeImage);
            bikeLink.appendChild(bikeName);
            bikeLink.appendChild(bikeSpecsContainer);
            bikeItem.appendChild(bikeLink);
            bikeGrid.appendChild(bikeItem);
        });

        resultsDiv.appendChild(bikeGrid);
    }

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.className = "restart-button";
    restartButton.onclick = function () {
        window.location.reload();
    };

    resultsDiv.appendChild(restartButton);
   
}


    setTimeout(function() {
        window.location.reload();
    }, 440000);

    