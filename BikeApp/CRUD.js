document.addEventListener("DOMContentLoaded", function () {
    const createForm = document.getElementById('createForm');
    const updateForm = document.getElementById('updateForm');
    const deleteForm = document.getElementById('deleteForm');
    const messageDiv = document.getElementById('message');

    createForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const bikeData = {
            name: document.getElementById('createName').value,
            image: document.getElementById('createImage').value,
            terrains: document.getElementById('createTerrains').value,
            motor: document.getElementById('createMotor').value,
            frame: document.getElementById('createFrame').value,
            specs: document.getElementById('createSpecs').value,
            buyURL: document.getElementById('createBuyURL').value
        };

        try {
            const response = await fetch('http://localhost:3000/bikes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bikeData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            showMessage(`Bike created with ID: ${data.id}`, 'success');
        } catch (error) {
            showMessage(`Error creating bike: ${error.message}`, 'error');
        }
    });

    updateForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const bikeId = document.getElementById('updateId').value;
        const bikeData = {
            name: document.getElementById('updateName').value,
            image: document.getElementById('updateImage').value,
            terrains: document.getElementById('updateTerrains').value,
            motor: document.getElementById('updateMotor').value,
            frame: document.getElementById('updateFrame').value,
            specs: document.getElementById('updateSpecs').value,
            buyURL: document.getElementById('updateBuyURL').value
        };

        try {
            const response = await fetch(`http://localhost:3000/bikes/${bikeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bikeData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            showMessage(`Bike with ID: ${data.id} updated`, 'success');
        } catch (error) {
            showMessage(`Error updating bike: ${error.message}`, 'error');
        }
    });

    deleteForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const bikeId = document.getElementById('deleteId').value;

        try {
            const response = await fetch(`http://localhost:3000/bikes/${bikeId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            showMessage(`Bike with ID: ${data.id} deleted`, 'success');
        } catch (error) {
            showMessage(`Error deleting bike: ${error.message}`, 'error');
        }
    });

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
    }
});