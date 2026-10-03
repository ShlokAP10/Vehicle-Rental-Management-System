```javascript
// VEHICLES
let vehicles = [
    {
        id: 101,
        name: "Honda City",
        type: "Car",
        price: 2500,
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 102,
        name: "Maruti Swift",
        type: "Car",
        price: 1500,
        image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 103,
        name: "Hyundai Creta",
        type: "SUV",
        price: 2200,
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 104,
        name: "Toyota Fortuner",
        type: "SUV",
        price: 4000,
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 105,
        name: "Royal Enfield",
        type: "Bike",
        price: 900,
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 106,
        name: "Yamaha MT-15",
        type: "Bike",
        price: 700,
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80"
    }
];

let rentals = [];
let filter = "All";
let rentalId = 1001;


// DISPLAY VEHICLES
function displayVehicles() {

    let grid = document.getElementById("vehicleGrid");
    let search = document.getElementById("searchInput").value.toLowerCase();

    grid.innerHTML = "";

    for (let i = 0; i < vehicles.length; i++) {

        let vehicle = vehicles[i];

        if (filter != "All" && vehicle.type != filter) {
            continue;
        }

        if (!vehicle.name.toLowerCase().includes(search) &&
            !vehicle.type.toLowerCase().includes(search)) {
            continue;
        }

        let rented = false;

        for (let j = 0; j < rentals.length; j++) {
            if (rentals[j].vehicleId == vehicle.id &&
                rentals[j].status == "Active") {
                rented = true;
            }
        }

        grid.innerHTML += `
            <div class="vehicle-card">

                <img src="${vehicle.image}" alt="${vehicle.name}">

                <div class="vehicle-info">
                    <h3>${vehicle.name}</h3>
                    <p>${vehicle.type}</p>
                    <p>₹${vehicle.price} per day</p>

                    <button
                        onclick="selectVehicle(${vehicle.id})"
                        ${rented ? "disabled" : ""}>
                        ${rented ? "Unavailable" : "Rent"}
                    </button>
                </div>

            </div>
        `;
    }
}


// FILTER
function setFilter(type, button) {

    filter = type;
    displayVehicles();
}


// SELECT VEHICLE
function selectVehicle(id) {

    document.getElementById("vehicle").value = id;

    calculatePreview();

    document.getElementById("rent").scrollIntoView({
        behavior: "smooth"
    });
}


// LOAD VEHICLES INTO SELECT BOX
function loadVehicles() {

    let select = document.getElementById("vehicle");

    for (let i = 0; i < vehicles.length; i++) {

        let vehicle = vehicles[i];

        select.innerHTML += `
            <option value="${vehicle.id}">
                ${vehicle.name} - ₹${vehicle.price}/day
            </option>
        `;
    }
}


// CALCULATE PRICE
function calculatePreview() {

    let id = Number(document.getElementById("vehicle").value);
    let days = Number(document.getElementById("days").value);

    if (days < 1) {
        days = 1;
    }

    let vehicle = null;

    for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].id == id) {
            vehicle = vehicles[i];
        }
    }

    if (vehicle == null) {
        document.getElementById("summaryVehicle").textContent = "—";
        document.getElementById("summaryRate").textContent = "₹0";
        document.getElementById("summaryDays").textContent = "1 day";
        document.getElementById("previewPrice").textContent = "₹0";
        return;
    }

    let total = vehicle.price * days;

    document.getElementById("summaryVehicle").textContent = vehicle.name;
    document.getElementById("summaryRate").textContent = "₹" + vehicle.price;
    document.getElementById("summaryDays").textContent = days + " day(s)";
    document.getElementById("previewPrice").textContent = "₹" + total;
}


// RENT VEHICLE
function rentVehicle() {

    let customer = document.getElementById("customer").value;
    let phone = document.getElementById("phone").value;
    let vehicleId = Number(document.getElementById("vehicle").value);
    let days = Number(document.getElementById("days").value);

    if (customer == "" || phone == "" || vehicleId == 0) {
        document.getElementById("message").textContent =
            "Please fill all details.";
        return;
    }

    if (days < 1) {
        document.getElementById("message").textContent =
            "Enter valid rental days.";
        return;
    }

    let vehicle = null;

    for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].id == vehicleId) {
            vehicle = vehicles[i];
        }
    }

    if (vehicle == null) {
        return;
    }

    // Check if vehicle is already rented
    for (let i = 0; i < rentals.length; i++) {

        if (rentals[i].vehicleId == vehicleId &&
            rentals[i].status == "Active") {

            document.getElementById("message").textContent =
                "Vehicle is already rented.";
            return;
        }
    }

    let total = vehicle.price * days;

    let rental = {
        id: rentalId,
        customer: customer,
        phone: phone,
        vehicleId: vehicleId,
        vehicleName: vehicle.name,
        days: days,
        total: total,
        status: "Active"
    };

    rentals.push(rental);
    rentalId++;

    document.getElementById("message").textContent =
        "Rental successful! ID: " + rental.id;

    displayVehicles();
    displayRentals();
    updateStats();

    document.getElementById("customer").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("vehicle").value = "";
    document.getElementById("days").value = 1;

    calculatePreview();
}


// DISPLAY RENTAL RECORDS
function displayRentals() {

    let table = document.getElementById("rentalTable");

    table.innerHTML = "";

    if (rentals.length == 0) {

        table.innerHTML =
            `<tr>
                <td colspan="7">No rental records yet.</td>
            </tr>`;

        return;
    }

    for (let i = 0; i < rentals.length; i++) {

        let rental = rentals[i];

        table.innerHTML += `
            <tr>
                <td>${rental.id}</td>
                <td>${rental.customer}</td>
                <td>${rental.vehicleName}</td>
                <td>${rental.days}</td>
                <td>₹${rental.total}</td>
                <td>${rental.status}</td>
                <td>
                    ${
                        rental.status == "Active"
                        ?
                        `<button onclick="returnVehicle(${rental.id})">
                            Return
                        </button>`
                        :
                        "Completed"
                    }
                </td>
            </tr>
        `;
    }
}


// RETURN VEHICLE
function returnVehicle(id) {

    for (let i = 0; i < rentals.length; i++) {

        if (rentals[i].id == id) {

            rentals[i].status = "Returned";

            document.getElementById("message").textContent =
                "Vehicle returned successfully.";

            displayVehicles();
            displayRentals();
            updateStats();

            return;
        }
    }
}


// UPDATE STATISTICS
function updateStats() {

    let available = 0;
    let active = 0;
    let revenue = 0;

    for (let i = 0; i < vehicles.length; i++) {

        let rented = false;

        for (let j = 0; j < rentals.length; j++) {

            if (rentals[j].vehicleId == vehicles[i].id &&
                rentals[j].status == "Active") {

                rented = true;
            }
        }

        if (!rented) {
            available++;
        }
    }

    for (let i = 0; i < rentals.length; i++) {

        revenue += rentals[i].total;

        if (rentals[i].status == "Active") {
            active++;
        }
    }

    document.getElementById("totalVehicles").textContent =
        vehicles.length;

    document.getElementById("availableVehicles").textContent =
        available;

    document.getElementById("activeRentals").textContent =
        active;

    document.getElementById("totalRevenue").textContent =
        "₹" + revenue;
}


// PAGE LOAD
loadVehicles();
displayVehicles();
displayRentals();
updateStats();
calculatePreview();
```
