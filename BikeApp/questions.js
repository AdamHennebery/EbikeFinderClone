
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("questionnaireForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const selectedTerrains = Array.from(form.querySelectorAll("input[name='terrain']:checked"))
            .map(input => input.value);
        const selectedFrame = form.querySelector("input[name='frame']:checked")?.value;

        // Call a function to filter bikes based on selected terrains and frame style
        const filteredBikes = filterBikes(selectedTerrains, selectedFrame);
        displayBikes(filteredBikes);
    });
});

function filterBikes(selectedTerrains, selectedFrame) {
    // Assume you have a list of bikes with their terrain suitability and frame styles
    const bikes = [
        { name: "Bike A", terrains: ["pavement", "dirt"], frame: "step_through" },
        { name: "Bike B", terrains: ["pavement", "gravel"], frame: "step_over" },
        { name: "Bike C", terrains: ["snow_ice"], frame: "step_through" },
        // Add more bikes as needed
    ];

    // Filter bikes based on selected terrains and frame style
    const filteredBikes = bikes.filter(bike =>
        selectedTerrains.every(terrain => bike.terrains.includes(terrain)) &&
        (!selectedFrame || bike.frame === selectedFrame)
    );

    return filteredBikes;
}

function displayBikes(bikes) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h2>Recommended Bikes</h2>";
    if (bikes.length === 0) {
        resultsDiv.innerHTML += "<p>No bikes found for selected criteria.</p>";
    } else {
        const bikeList = document.createElement("ul");
        bikes.forEach(bike => {
            const listItem = document.createElement("li");
            listItem.textContent = bike.name;
            bikeList.appendChild(listItem);
        });
        resultsDiv.appendChild(bikeList);
    }
}
