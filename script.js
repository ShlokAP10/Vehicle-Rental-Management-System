/* =========================================
   VEHICLE DATA
========================================= */

const vehicles = [

    {
        id: 101,
        name: "Honda City",
        type: "Car",
        number: "MH01AB1234",
        price: 2500,
        color: "#687064",
        available: true
    },

    {
        id: 102,
        name: "Maruti Swift",
        type: "Car",
        number: "MH02CD5678",
        price: 1500,
        color: "#8A8075",
        available: true
    },

    {
        id: 103,
        name: "Toyota Fortuner",
        type: "SUV",
        number: "MH03EF9012",
        price: 3500,
        color: "#5E625B",
        available: true
    },

    {
        id: 104,
        name: "Hyundai Creta",
        type: "SUV",
        number: "MH04GH3456",
        price: 2800,
        color: "#817C70",
        available: true
    },

    {
        id: 105,
        name: "Royal Enfield",
        type: "Bike",
        number: "MH05IJ7890",
        price: 900,
        color: "#4E554C",
        available: true
    },

    {
        id: 106,
        name: "Yamaha MT-15",
        type: "Bike",
        number: "MH06KL1234",
        price: 750,
        color: "#706E65",
        available: true
    }

];


/* =========================================
   RENTAL DATA
========================================= */

const rentals = [];

let rentalNumber = 1;

let selectedType = "all";

let totalRevenue = 0;


/* =========================================
   DISPLAY VEHICLES
========================================= */

function displayVehicles() {

    const grid =
        document.getElementById("vehicleGrid");

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    grid.innerHTML = "";


    for (let i = 0; i < vehicles.length; i++) {

        const vehicle = vehicles[i];


        const matchesSearch =
            vehicle.name
                .toLowerCase()
                .includes(search) ||

            vehicle.number
                .toLowerCase()
                .includes(search);


        const matchesType =
            selectedType === "all" ||
            vehicle.type === selectedType;


        if (matchesSearch && matchesType) {

            createVehicleCard(vehicle, grid);
        }
    }


    updateDashboard();

    updateVehicleSelect();
}


/* =========================================
   CREATE VEHICLE CARD
========================================= */

function createVehicleCard(vehicle, grid) {

    const status =
        vehicle.available
            ? "Available"
            : "Rented";


    const statusClass =
        vehicle.available
            ? "available"
            : "rented";


    grid.innerHTML += `

        <article class="vehicle-card">

            <div
                class="vehicle-image"
                style="--vehicle-color: ${vehicle.color}"
            >

                <div class="vehicle-wheels">
                    <span></span>
                    <span></span>
                </div>

            </div>


            <div class="vehicle-info">

                <div class="vehicle-info-top">

                    <div>

                        <h3>
                            ${vehicle.name}
                        </h3>

                        <p class="vehicle-type">
                            ${vehicle.type}
                        </p>

                    </div>


                    <span class="status ${statusClass}">
                        ${status}
                    </span>

                </div>


                <p class="vehicle-number">
                    Registration · ${vehicle.number}
                </p>


                <div class="vehicle-bottom">

                    <div class="vehicle-price">

                        <strong>
                            ₹${vehicle.price.toLocaleString("en-IN")}
                        </strong>

                        <span>
                            / day
                        </span>

                    </div>


                    <button
                        class="rent-small-button"
                        onclick="selectVehicle(${vehicle.id})"
                        ${vehicle.available ? "" : "disabled"}
                    >
                        ${vehicle.available ? "Rent" : "Rented"}
                    </button>

                </div>

            </div>

        </article>

    `;
}


/* =========================================
   FILTER VEHICLES
========================================= */

function filterVehicles(type, button) {

    selectedType = type;


    const buttons =
        document.querySelectorAll(".filter");


    for (let i = 0; i < buttons.length; i++) {

        buttons[i].classList.remove("active");
    }


    button.classList.add("active");


    displayVehicles();
}


/* =========================================
   FIND VEHICLE
========================================= */

function findVehicle(id) {

    for (let i = 0; i < vehicles.length; i++) {

        if (vehicles[i].id === id) {

            return vehicles[i];
        }
    }


    return null;
}


/* =========================================
   SELECT VEHICLE
========================================= */

function selectVehicle(id) {

    const vehicle = findVehicle(id);


    if (!vehicle || !vehicle.available) {

        return;
    }


    document.getElementById("vehicle").value =
        vehicle.id;


    calculatePreview();


    document
        .getElementById("rent")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================================
   UPDATE VEHICLE DROPDOWN
========================================= */

function updateVehicleSelect() {

    const select =
        document.getElementById("vehicle");


    const currentValue =
        select.value;


    select.innerHTML =
        `<option value="">
            Select a vehicle
        </option>`;


    for (let i = 0; i < vehicles.length; i++) {

        const vehicle = vehicles[i];


        if (vehicle.available) {

            select.innerHTML += `

                <option value="${vehicle.id}">
                    ${vehicle.name} —
                    ₹${vehicle.price.toLocaleString("en-IN")}/day
                </option>

            `;
        }
    }


    select.value = currentValue;
}


/* =========================================
   CALCULATE RENTAL PRICE
========================================= */

function calculatePreview() {

    const vehicleId =
        Number(
            document.getElementById("vehicle").value
        );


    const days =
        Number(
            document.getElementById("days").value
        );


    const priceElement =
        document.getElementById("previewPrice");

    const vehicleElement =
        document.getElementById("summaryVehicle");

    const rateElement =
        document.getElementById("summaryRate");

    const daysElement =
        document.getElementById("summaryDays");


    if (!vehicleId) {

        vehicleElement.innerText = "—";

        rateElement.innerText = "₹0";

        daysElement.innerText = "1 day";

        priceElement.innerText = "₹0";

        return;
    }


    const vehicle =
        findVehicle(vehicleId);


    if (!vehicle) {

        return;
    }


    if (days < 1) {

        return;
    }


    const total =
        vehicle.price * days;


    vehicleElement.innerText =
        vehicle.name;


    rateElement.innerText =
        "₹" +
        vehicle.price.toLocaleString("en-IN");


    daysElement.innerText =
        days +
        (days === 1 ? " day" : " days");


    priceElement.innerText =
        "₹" +
        total.toLocaleString("en-IN");
}


/* =========================================
   RENT VEHICLE
========================================= */

function rentVehicle() {

    const customer =
        document
            .getElementById("customer")
            .value
            .trim();


    const phone =
        document
            .getElementById("phone")
            .value
            .trim();


    const vehicleId =
        Number(
            document.getElementById("vehicle").value
        );


    const days =
        Number(
            document.getElementById("days").value
        );


    const message =
        document.getElementById("message");


    /* BASIC VALIDATION */

    if (
        customer === "" ||
        phone === "" ||
        !vehicleId ||
        !days
    ) {

        showMessage(
            "Please fill in all the required details.",
            false
        );

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        showMessage(
            "Please enter a valid 10-digit phone number.",
            false
        );

        return;
    }


    if (days < 1 || days > 30) {

        showMessage(
            "Rental duration must be between 1 and 30 days.",
            false
        );

        return;
    }


    const vehicle =
        findVehicle(vehicleId);


    if (!vehicle) {

        showMessage(
            "Vehicle could not be found.",
            false
        );

        return;
    }


    if (!vehicle.available) {

        showMessage(
            "This vehicle is already rented.",
            false
        );

        return;
    }


    /* CALCULATE TOTAL */

    const total =
        vehicle.price * days;


    /* CREATE RENTAL */

    const rental = {

        id:
            "R" +
            String(rentalNumber).padStart(3, "0"),

        customer:
            customer,

        phone:
            phone,

        vehicleId:
            vehicle.id,

        vehicleName:
            vehicle.name,

        days:
            days,

        total:
            total,

        status:
            "Active"

    };


    rentals.push(rental);


    rentalNumber++;


    totalRevenue += total;


    /* VEHICLE BECOMES UNAVAILABLE */

    vehicle.available = false;


    showMessage(
        "Rental confirmed successfully.",
        true
    );


    /* CLEAR FORM */

    document
        .getElementById("customer")
        .value = "";

    document
        .getElementById("phone")
        .value = "";

    document
        .getElementById("vehicle")
        .value = "";

    document
        .getElementById("days")
        .value = 1;


    calculatePreview();

    displayVehicles();

    displayRentals();

    updateDashboard();
}


/* =========================================
   MESSAGE
========================================= */

function showMessage(text, success) {

    const message =
        document.getElementById("message");


    message.innerText = text;


    if (success) {

        message.style.color = "#aeb8a5";

    } else {

        message.style.color = "#d98c82";
    }
}


/* =========================================
   DISPLAY RENTAL RECORDS
========================================= */

function displayRentals() {

    const table =
        document.getElementById("rentalTable");


    if (rentals.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="empty-row"
                >
                    No rental records yet.
                </td>

            </tr>

        `;

        return;
    }


    table.innerHTML = "";


    for (let i = 0; i < rentals.length; i++) {

        const rental = rentals[i];


        let action;


        if (rental.status === "Active") {

            action = `

                <button
                    class="return-button"
                    onclick="returnVehicle('${rental.id}')"
                >
                    Return
                </button>

            `;

        } else {

            action = `
                <span class="returned">
                    Returned
                </span>
            `;
        }


        table.innerHTML += `

            <tr>

                <td>
                    ${rental.id}
                </td>

                <td>
                    ${rental.customer}
                </td>

                <td>
                    ${rental.vehicleName}
                </td>

                <td>
                    ${rental.days}
                </td>

                <td>
                    ₹${rental.total.toLocaleString("en-IN")}
                </td>

                <td>

                    <span class="status ${
                        rental.status === "Active"
                            ? "rented"
                            : "available"
                    }">

                        ${rental.status}

                    </span>

                </td>

                <td>
                    ${action}
                </td>

            </tr>

        `;
    }
}


/* =========================================
   RETURN VEHICLE
========================================= */

function returnVehicle(rentalId) {

    for (let i = 0; i < rentals.length; i++) {

        const rental = rentals[i];


        if (rental.id === rentalId) {

            if (rental.status !== "Active") {

                return;
            }


            rental.status = "Returned";


            const vehicle =
                findVehicle(rental.vehicleId);


            if (vehicle) {

                vehicle.available = true;
            }


            displayVehicles();

            displayRentals();

            updateDashboard();


            showMessage(
                "Vehicle returned successfully.",
                true
            );


            return;
        }
    }
}


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

    let available = 0;

    let active = 0;


    for (let i = 0; i < vehicles.length; i++) {

        if (vehicles[i].available) {

            available++;
        }
    }


    for (let i = 0; i < rentals.length; i++) {

        if (rentals[i].status === "Active") {

            active++;
        }
    }


    document.getElementById("totalVehicles")
        .innerText = vehicles.length;


    document.getElementById("availableVehicles")
        .innerText = available;


    document.getElementById("activeRentals")
        .innerText = active;


    document.getElementById("totalRevenue")
        .innerText =
            "₹" +
            totalRevenue.toLocaleString("en-IN");
}


/* =========================================
   INITIAL LOAD
========================================= */

displayVehicles();

displayRentals();

updateDashboard();
