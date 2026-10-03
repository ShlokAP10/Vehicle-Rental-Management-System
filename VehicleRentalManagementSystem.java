```javascript
// VEHICLES

let vehicles = [
    {
        id: 1,
        name: "Honda City",
        type: "Car",
        price: 2500,
        image: "images/honda-city.jpg",
        available: true
    },
    {
        id: 2,
        name: "Maruti Swift",
        type: "Car",
        price: 1500,
        image: "images/maruti-swift.jpg",
        available: true
    },
    {
        id: 3,
        name: "Hyundai Creta",
        type: "SUV",
        price: 2200,
        image: "images/hyundai-creta.jpg",
        available: true
    },
    {
        id: 4,
        name: "Toyota Fortuner",
        type: "SUV",
        price: 4000,
        image: "images/toyota-fortuner.jpg",
        available: true
    },
    {
        id: 5,
        name: "Royal Enfield",
        type: "Bike",
        price: 900,
        image: "images/royal-enfield.jpg",
        available: true
    },
    {
        id: 6,
        name: "Yamaha MT-15",
        type: "Bike",
        price: 700,
        image: "images/yamaha-mt15.jpg",
        available: true
    }
];

let rentals = [];
let filter = "All";
let rentalId = 1;


// DISPLAY VEHICLES

function displayVehicles() {

    let grid = document.getElementById("vehicleGrid");
    let search = document.getElementById("searchInput").value.toLowerCase();

    grid.innerHTML = "";

    for (let vehicle of vehicles) {

        if (filter != "All" && vehicle.type != filter)
            continue;

        if (!vehicle.name.toLowerCase().includes(search))
            continue;

        grid.innerHTML += `
            <div class="vehicle-card">

                <div class="vehicle-image">
                    <img src="${vehicle.image}" alt="${vehicle.name}">
                </div>

                <div class="vehicle-info">

                    <div class="vehicle-name">
                        ${vehicle.name}
                    </div>

                    <div class="vehicle-type">
                        ${vehicle.type}
                    </div>

                    <div class="vehicle-price">
                        ₹${vehicle.price} / day
                    </div>

                    <div class="vehicle-meta">

                        <span>
                            ${vehicle.available ? "Available" : "Rented"}
                        </span>

                        <button
                            class="vehicle-rent-btn"
                            onclick="selectVehicle(${vehicle.id})"
                            ${vehicle.available ? "" : "disabled"}>

                            Rent

                        </button>

                    </div>

                </div>

            </div>
        `;
    }

    updateStats();
}


// FILTER VEHICLES

function setFilter(type, button) {

    filter = type;

    displayVehicles();
}


// SELECT VEHICLE

function selectVehicle(id) {

    document.getElementById("vehicle").value = id;

    calculatePreview();

    document.getElementById("rent").scrollIntoView();
}


// LOAD VEHICLES INTO SELECT BOX

function loadVehicles() {

    let select = document.getElementById("vehicle");

    for (let vehicle of vehicles) {

        let option = document.createElement("option");

        option.value = vehicle.id;
        option.textContent =
            vehicle.name + " - ₹" + vehicle.price + "/day";

        select.appendChild(option);
    }
}


// CALCULATE PRICE

function calculatePreview() {

    let id = document.getElementById("vehicle").value;
    let days = document.getElementById("days").value;

    let vehicle = vehicles.find(v => v.id == id);

    if (!vehicle) {
        document.getElementById("summaryVehicle").textContent = "—";
        document.getElementById("summaryRate").textContent = "₹0";
        document.getElementById("summaryDays").textContent = "1 day";
        document.getElementById("previewPrice").textContent = "₹0";
        return;
    }

    let total = vehicle.price * days;

    document.getElementById("summaryVehicle").textContent =
        vehicle.name;

    document.getElementById("summaryRate").textContent =
        "₹" + vehicle.price;

    document.getElementById("summaryDays").textContent =
        days + (days == 1 ? " day" : " days");

    document.getElementById("previewPrice").textContent =
        "₹" + total;
}


// RENT VEHICLE

function rentVehicle() {

    let name = document.getElementById("customer").value;
    let phone = document.getElementById("phone").value;
    let vehicleId = document.getElementById("vehicle").value;
    let days = Number(document.getElementById("days").value);
    let message = document.getElementById("message");

    if (name == "" || phone == "" || vehicleId == "") {

        message.textContent = "Please fill all details.";
        return;
    }

    let vehicle = vehicles.find(v => v.id == vehicleId);

    if (!vehicle.available) {

        message.textContent = "Vehicle is already rented.";
        return;
    }

    let total = vehicle.price * days;

    let rental = {

        id: rentalId,

        customer: name,

        phone: phone,

        vehicle: vehicle.name,

        vehicleId: vehicle.id,

        days: days,

        total: total,

        active: true
    };

    rentals.push(rental);

    rentalId++;

    vehicle.available = false;

    message.textContent = "Rental successful!";

    displayVehicles();
    displayRentals();
    calculatePreview();

    document.getElementById("customer").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("vehicle").value = "";
    document.getElementById("days").value = 1;
}


// DISPLAY RENTALS

function displayRentals() {

    let table = document.getElementById("rentalTable");

    table.innerHTML = "";

    if (rentals.length == 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    No rental records yet.
                </td>
            </tr>
        `;

        return;
    }

    for (let rental of rentals) {

        table.innerHTML += `
            <tr>

                <td>${rental.id}</td>

                <td>${rental.customer}</td>

                <td>${rental.vehicle}</td>

                <td>${rental.days}</td>

                <td>₹${rental.total}</td>

                <td>
                    ${rental.active ? "Active" : "Returned"}
                </td>

                <td>

                    ${
                        rental.active
                        ?
                        `<button onclick="returnVehicle(${rental.id})">
                            Return
                         </button>`
                        :
                        "Done"
                    }

                </td>

            </tr>
        `;
    }
}


// RETURN VEHICLE

function returnVehicle(id) {

    let rental = rentals.find(r => r.id == id);

    if (!rental)
        return;

    rental.active = false;

    let vehicle = vehicles.find(
        v => v.id == rental.vehicleId
    );

    vehicle.available = true;

    displayVehicles();
    displayRentals();
    updateStats();
}


// UPDATE STATISTICS

function updateStats() {

    let available = vehicles.filter(
        v => v.available
    ).length;

    let active = rentals.filter(
        r => r.active
    ).length;

    let revenue = rentals.reduce(
        (total, r) => total + r.total,
        0
    );

    document.getElementById("totalVehicles").textContent =
        vehicles.length;

    document.getElementById("availableVehicles").textContent =
        available;

    document.getElementById("activeRentals").textContent =
        active;

    document.getElementById("totalRevenue").textContent =
        "₹" + revenue;
}


// START WEBSITE

loadVehicles();
displayVehicles();
displayRentals();
updateStats();
```
