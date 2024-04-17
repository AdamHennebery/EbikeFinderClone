document.addEventListener("DOMContentLoaded", function () {
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
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedTerrains = Array.from(form.querySelectorAll("input[name='terrain']:checked"))
            .map(input => input.value);
        const selectedFrameCheckboxes = form.querySelectorAll("input[name='frame']:checked");
        const selectedFrame = Array.from(selectedFrameCheckboxes).map(checkbox => checkbox.value);
        const selectedMotorCheckboxes = form.querySelectorAll("input[name='motor']:checked");
        const selectedMotor = Array.from(selectedMotorCheckboxes).map(checkbox => checkbox.value);
        console.log("Selected Motor:", selectedMotor);

        // Call a function to filter bikes based on selected terrains and frame style
        const filteredBikes = filterBikes(selectedTerrains, selectedFrame, selectedMotor);
        displayBikes(filteredBikes);
    });
});

function nextQuestion(nextPageId) {
    const currentPage = document.querySelector('.question-page.active');
    const nextPage = document.getElementById(nextPageId);
    currentPage.classList.remove('active');
    nextPage.classList.add('active');
}

function filterBikes(selectedTerrains, selectedFrame, selectedMotor) {


    // Assume you have a list of bikes with their terrain suitability and frame styles
    const bikes = [
        { name: "Aventon Abound", image: "images/abound.jpg", terrains: ["pavement", "dirt", "gravel"], motor: "500", frame: "step_through", specs: "Motor: 750Watts Battery: 15AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/aventon-abound?_pos=1&_psq=abound&_ss=e&_v=1.0' },
    { name: "Aventon Aventure 2", image: "images/aventure2so.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "750", frame: "step_over", specs: "Motor: 750Watts Battery: 15AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/aventon-aventure-2-step-over?_pos=1&_psq=aven&_ss=e&_v=1.0' },
    { name: "Aventon Level 2", image: "images/Level2_SO.jpg", terrains: ["pavement", "dirt"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 14AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/copy-of-aventon-level-2-step-through?_pos=1&_sid=0a06855f2&_ss=r' },
    { name: "Aventon Pace 500", image: "images/pace500_st.jpg", terrains: ["pavement"], motor: "500", frame: "step_through", specs: "Motor: 500Watts Battery: 13AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/aventon-pace-500-3-step-thru?_pos=1&_sid=c7960c655&_ss=r' },
    { name: "Aventon Sinch 2", image: "images/sinch2.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_through", specs: "Motor: 500Watts Battery: 14AH Range: 65km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/aventon-sinch-step-thru?_pos=1&_sid=29dd3ea12&_ss=r' },
    { name: "Bakcou Flatlander", image: "images/bakcou_flatlander.jpg", terrains: ["dirt", "gravel", "snow_ice"], motor: "750", frame: "step_over", specs: "Motor: 750Watt Battery: 25AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/bakcou-flatlander?_pos=1&_sid=1c77c4eef&_ss=r' },
    { name: "Bakcou Mule", image: "images/bakcou_mule.jpg", terrains: ["dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watt Battery: 25AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/bakcou-mule-1?_pos=1&_sid=92546c830&_ss=r' },
    { name: "Bakcou Mule Jager", image: "images/bakcou_mule_jager.jpg", terrains: ["dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watt Battery: 25AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/bakcou-mule-jager?_pos=2&_psq=mule&_ss=e&_v=1.0' },
    { name: "Bakcou Scout", image: "images/bakcou_scout.jpg", terrains: ["dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watt Battery: 21AH Range: 65km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/bakcou-scout?_pos=1&_sid=86aebc699&_ss=r' },
    { name: "Bakcou Scout Jager", image: "images/bakcou_scout_jager.jpg", terrains: ["dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watt Battery: 21AH Range: 65km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/bakcou-scout-jager?_pos=3&_sid=86aebc699&_ss=r' },
    { name: "Bakcou Storm", image: "images/bakcou_storm.jpg", terrains: ["dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watt Battery: 25AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/bakcou-storm?_pos=1&_sid=f44776c47&_ss=r' },
    { name: "Bakcou Storm Jager", image: "images/bakcou_storm_jager.jpg", terrains: ["dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watt Battery: 25AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/bakcou-storm-jagger?_pos=2&_sid=f44776c47&_ss=r' },
    { name: "Element E-Circuit", image: "images/ecircuit.jpg", terrains: ["pavement", "dirt", "gravel"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 17.5AH Range: 90km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/element-e-circuit-27-5?_pos=4&_psq=element&_ss=e&_v=1.0' },
    { name: "Element E-Lighten 250W", image: "images/elighten250.jpg", terrains: ["pavement"], motor: "250", frame: "step_over", specs: "Motor: 250Watts Battery: 5.2AH Range: 70km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/element-e-lighten-250b-belt-700c-hybrid-e-bike' },
    { name: "Element E-Lighten 350", image: "images/elighten350.jpg", terrains: ["pavement"], motor: "350", frame: "step_over", specs: "Motor: 350Watts Battery: 7AH Range: 70km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/element-e-lighten-350rd-700c-hybrid-e-bike' },
    { name: "Element E-Venture", image: "images/eventure.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_over", specs: "Motor: 500Watt Battery: 18.2AH Range: 110km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/element-e-venture-29-mountain-e-bike' },
    { name: "Envo Flex Overland", image: "images/envo_overland.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_through", specs: "Motor: 500w Battery: 17AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/envo-overlander' },
    { name: "Envo Stax", image: "images/envo_stax.jpg", terrains: ["pavement"], motor: "500", frame: "step_over", specs: "Motor: 500w Battery: 12.8AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/envo-stax-1' },
    { name: "Niji Tanya", image: "images/nijitanya.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_through", specs: "Motor: 500Watts Battery: 13AH Range: 50km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/niji-tanya-foldable-hybrid-compact-ebike' },
    { name: "Niji Trike", image: "images/nijitrike.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_through", specs: "Motor: 750Watts Battery: 13AH Range: 50km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/niji-hp-trike' },
    { name: "QuietKat Apex Pro", image: "images/apexpro.jpg", terrains: ["dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watts Battery: 17.25AH Range: 85km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/quietkat-apex-pro-e-bike' },
    { name: "QuietKat Ranger", image: "images/quietkat_ranger.jpg", terrains: ["dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watts Battery: 13AH Range: 60km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/quietkat-ranger-e-bike' },
    { name: "Silverback 20' Folding", image: "images/silverback_folding20.jpg", terrains: ["pavement", "dirt",], motor: "500", frame: "step_over", specs: "Motor: 750Watts Battery: 15AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-af20-folding' },
    { name: "Silverback 24' Cruiser", image: "images/silverback_24.jpg", terrains: ["pavement"], motor: "500", frame: "step_through", specs: "Motor: 750Watts Battery: 15AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-a5-24-500' },
    { name: "Silverback 26' Fat Tire", image: "images/silverback26fat.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 13AH Range: 60km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-a6ah26f' },
    { name: "Silverback 26' Step Through ", image: "images/silverbackred.jpg", terrains: ["pavement", "dirt",], motor: "500", frame: "step_through", specs: "Motor: 500Watts Battery: 16AH Range: 110km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-a5-26-501' },
    { name: "Silverback City 29'", image: "images/silverback_city_29.jpg", terrains: ["pavement", "dirt"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 13AH/20AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/order-model-a6-29' },
    { name: "Silverback D20F'", image: "images/silverback_d20f.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 13AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-d20f' },
    { name: "Silverback Dual Motor", image: "images/silverback_dual.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watts Battery: 20AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-ddf2620' },
    { name: "Silverback M600", image: "images/silverback_m600.jpg", terrains: ["pavement", "dirt", "gravel"], motor: "500", frame: "step_over", specs: "Motor: 500Watt Battery: 16AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-m600' },
    { name: "Silverback Thrill", image: "images/silverback_thrill.jpg", terrains: ["pavement", "dirt", "gravel"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 13AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-a626-sport' },
    { name: "Trivel E-Azteca Trike", image: "images/trivelskinny.jpg", terrains: ["pavement", "dirt", "gravel"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 14AH Range: 90km Top Speed: 32km/hr", buyURL: 'https://ebikeedmonton.com/products/trivel-e-azteca' },
    { name: "Trivel E-Azteca Trike Fat Tire", image: "images/trivelfat.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 14AH Range: 90km Top Speed: 32km/hr", buyURL: 'https://ebikeedmonton.com/products/copy-of-trivel-e-azteca' }

        // Add more bikes as neede
    ];

    const selectedMotorInt = selectedMotor ? Array.isArray(selectedMotor) ? selectedMotor.map(motor => parseInt(motor)) : [parseInt(selectedMotor)] : null;
    const selectedFrameArray = Array.isArray(selectedFrame) ? selectedFrame : [selectedFrame]; // Convert selectedFrame to an array if it's not already
    const filteredBikes = bikes.filter(bike => {

        const terrainMatch = selectedTerrains.some(terrain => bike.terrains.includes(terrain));
        const frameMatch = selectedFrameArray.length === 0 || selectedFrameArray.includes(bike.frame); // Check if bike's frame is included in the selectedFrameArray
        const motorMatch = !selectedMotorInt || selectedMotorInt.some(motor => parseInt(bike.motor) === motor);

        return terrainMatch && frameMatch && motorMatch;
    });

    return filteredBikes;
}

function displayBikes(bikes) {
    const resultsDiv = document.getElementById("results");
    const questionPage = document.getElementById("frameQuestion");

    // Hide the question page
    questionPage.classList.remove('active');
    resultsDiv.innerHTML = "<h2>Recommended Bikes</h2>";
    resultsDiv.classList.add("results-header")
    if (bikes.length === 0) {
        resultsDiv.innerHTML += "<p>No bikes found for selected criteria.</p>";
    } else {
        const bikeGrid = document.createElement("div");
        bikeGrid.classList.add("bike-grid");

        bikes.forEach(bike => {
            const bikeItem = document.createElement("div");
            bikeItem.classList.add("bike-item");

            // Create anchor element
            const bikeLink = document.createElement("a");
            bikeLink.href = bike.buyURL; // Assuming you have a "buyURL" property for each bike
            bikeLink.target = "_blank"; // Open link in a new tab

            // Create image element
            const bikeImage = document.createElement("img");
            bikeImage.src = bike.image; // Assuming the images are named accordingly

            // Create name element
            const bikeName = document.createElement("h3");
            bikeName.textContent = bike.name;

            // Create specs elements
            const bikeSpecsContainer = document.createElement("div");

            // Extracting specifications
            const specsArray = bike.specs.split(' ');
            const motor = specsArray[1];
            const battery = specsArray[3];
            const range = specsArray[5];
            const topSpeed = specsArray[8];

            // First line of specifications (Motor and Battery)
            const motorBatterySpecs = document.createElement("p");
            motorBatterySpecs.textContent = `Motor: ${motor} | Battery: ${battery}`;

            // Second line of specifications (Range and Top Speed)
            const rangeSpeedSpecs = document.createElement("p");
            rangeSpeedSpecs.textContent = `Range: ${range} | Top Speed: ${topSpeed}`;

            // Append specifications elements to container
            bikeSpecsContainer.appendChild(motorBatterySpecs);
            bikeSpecsContainer.appendChild(rangeSpeedSpecs);

            // Append image, name, and specifications container to the anchor element
            bikeLink.appendChild(bikeImage);
            bikeLink.appendChild(bikeName);
            bikeLink.appendChild(bikeSpecsContainer);

            // Append the anchor element to the bike item
            bikeItem.appendChild(bikeLink);

            // Append the bike item to the bike grid
            bikeGrid.appendChild(bikeItem);
        });
        resultsDiv.appendChild(bikeGrid);
    }
}