
const vehicles = [

    {
        id: 101,
        name: "Honda City",
        type: "Car",
        number: "MH01AB1234",
        price: 2500,
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 102,
        name: "Maruti Swift",
        type: "Car",
        number: "MH02CD5678",
        price: 1500,
        image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 103,
        name: "Hyundai Creta",
        type: "SUV",
        number: "MH03EF9012",
        price: 2200,
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 104,
        name: "Toyota Fortuner",
        type: "SUV",
        number: "MH04GH3456",
        price: 4000,
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 105,
        name: "Royal Enfield",
        type: "Bike",
        number: "MH05IJ7890",
        price: 900,
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 106,
        name: "Yamaha MT-15",
        type: "Bike",
        number: "MH06KL1234",
        price: 700,
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80"
    }

];


/* =========================
   VARIABLES
========================= */

let currentFilter = "All";

let rentals =
    JSON.parse(localStorage.getItem("motivoRentals")) || [];

let nextRentalId =
    Number(localStorage.getItem("motivoNextRentalId")) || 1001;




document.addEventListener("DOMContentLoaded", function () {

    displayVehicles();

    populateVehicleSelect();

    displayRentals();

    updateStats();

    calculatePreview();

});



function setFilter(type, button) {

    currentFilter = type;

    const buttons =
        document.querySelectorAll(".filter");

    buttons.forEach(function (btn) {

        btn.classList.remove("active");

    });

    button.classList.add("active");

    displayVehicles();

}


/* =========================
   DISPLAY VEHICLES
========================= */

function displayVehicles() {

    const grid =
        document.getElementById("vehicleGrid");

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    grid.innerHTML = "";


    let filteredVehicles = vehicles.filter(function (vehicle) {

        const matchesFilter =
            currentFilter === "All" ||
            vehicle.type === currentFilter;


        const matchesSearch =
            vehicle.name
                .toLowerCase()
                .includes(search) ||

            vehicle.type
                .toLowerCase()
                .includes(search) ||

            vehicle.number
                .toLowerCase()
                .includes(search);


        return matchesFilter && matchesSearch;

    });


    if (filteredVehicles.length === 0) {

        grid.innerHTML = `
            <div class="empty-vehicles">
                No vehicles found.
            </div>
        `;

        return;
    }


    filteredVehicles.forEach(function (vehicle) {

        const rented =
            isVehicleRented(vehicle.id);


        const card =
            document.createElement("div");

        card.className = "vehicle-card";


        card.innerHTML = `

            <div class="vehicle-image">

                <img
                    src="${vehicle.image}"
                    alt="${vehicle.name}"
                    loading="lazy">

                <span class="vehicle-status ${rented ? "rented" : "available"}">
                    ${rented ? "RENTED" : "AVAILABLE"}
                </span>

            </div>


            <div class="vehicle-info">

                <div class="vehicle-top">

                    <div>

                        <div class="vehicle-name">
                            ${vehicle.name}
                        </div>

                        <div class="vehicle-type">
                            ${vehicle.type}
                        </div>

                    </div>


                    <div class="vehicle-price">

                        <strong>
                            ₹${vehicle.price}
                        </strong>

                        <span>
                            per day
                        </span>

                    </div>

                </div>


                <div class="vehicle-meta">

                    <span>
                        ${vehicle.number}
                    </span>

                    <button
                        class="vehicle-rent-btn"
                        ${rented ? "disabled" : ""}
                        onclick="selectVehicle(${vehicle.id})">

                        ${rented ? "Unavailable" : "Rent"}

                    </button>

                </div>

            </div>
        `;


        grid.appendChild(card);

    });

}


/* =========================
   CHECK VEHICLE STATUS
========================= */

function isVehicleRented(vehicleId) {

    return rentals.some(function (rental) {

        return (
            rental.vehicleId === vehicleId &&
            rental.status === "Active"
        );

    });

}


/* =========================
   FIND VEHICLE
========================= */

function findVehicle(id) {

    return vehicles.find(function (vehicle) {

        return vehicle.id === id;

    });

}


/* =========================
   SELECT VEHICLE
========================= */

function selectVehicle(id) {

    const vehicle =
        findVehicle(id);


    if (!vehicle) {
        return;
    }


    if (isVehicleRented(id)) {

        showMessage(
            "This vehicle is currently rented.",
            "error"
        );

        return;
    }


    const select =
        document.getElementById("vehicle");


    select.value = id;


    calculatePreview();


    document
        .getElementById("rent")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   POPULATE SELECT
========================= */

function populateVehicleSelect() {

    const select =
        document.getElementById("vehicle");


    vehicles.forEach(function (vehicle) {

        const option =
            document.createElement("option");


        option.value = vehicle.id;

        option.textContent =
            `${vehicle.name} — ₹${vehicle.price}/day`;


        select.appendChild(option);

    });

}


/* =========================
   PRICE CALCULATION
========================= */

function calculatePreview() {

    const vehicleId =
        Number(
            document.getElementById("vehicle").value
        );


    const days =
        Number(
            document.getElementById("days").value
        ) || 1;


    const vehicle =
        findVehicle(vehicleId);


    const summaryVehicle =
        document.getElementById("summaryVehicle");

    const summaryRate =
        document.getElementById("summaryRate");

    const summaryDays =
        document.getElementById("summaryDays");

    const previewPrice =
        document.getElementById("previewPrice");


    if (!vehicle) {

        summaryVehicle.textContent = "—";

        summaryRate.textContent = "₹0";

        summaryDays.textContent = "1 day";

        previewPrice.textContent = "₹0";

        return;
    }


    const total =
        vehicle.price * days;


    summaryVehicle.textContent =
        vehicle.name;


    summaryRate.textContent =
        `₹${vehicle.price}`;


    summaryDays.textContent =
        `${days} ${days === 1 ? "day" : "days"}`;


    previewPrice.textContent =
        `₹${total}`;

}


/* =========================
   RENT VEHICLE
========================= */

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
            document
                .getElementById("vehicle")
                .value
        );


    const days =
        Number(
            document
                .getElementById("days")
                .value
        );


    /* VALIDATION */

    if (customer.length < 2) {

        showMessage(
            "Please enter a valid customer name.",
            "error"
        );

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        showMessage(
            "Phone number must contain 10 digits.",
            "error"
        );

        return;
    }


    if (!vehicleId) {

        showMessage(
            "Please select a vehicle.",
            "error"
        );

        return;
    }


    if (!days || days < 1 || days > 30) {

        showMessage(
            "Rental period must be between 1 and 30 days.",
            "error"
        );

        return;
    }


    const vehicle =
        findVehicle(vehicleId);


    if (!vehicle) {

        showMessage(
            "Vehicle not found.",
            "error"
        );

        return;
    }


    if (isVehicleRented(vehicleId)) {

        showMessage(
            "This vehicle is already rented.",
            "error"
        );

        return;
    }


    const total =
        vehicle.price * days;


    /* CREATE RENTAL */

    const rental = {

        id: nextRentalId,

        customer: customer,

        phone: phone,

        vehicleId: vehicle.id,

        vehicleName: vehicle.name,

        days: days,

        total: total,

        status: "Active",

        date: new Date().toLocaleDateString("en-IN")

    };


    rentals.push(rental);


    nextRentalId++;


    saveData();


    displayVehicles();

    populateVehicleSelectRefresh();

    displayRentals();

    updateStats();


    showMessage(
        `Rental confirmed successfully. Rental ID: ${rental.id}`,
        "success"
    );


    clearForm();

}


/* =========================
   CLEAR FORM
========================= */

function clearForm() {

    document.getElementById("customer").value = "";

    document.getElementById("phone").value = "";

    document.getElementById("vehicle").value = "";

    document.getElementById("days").value = 1;

    calculatePreview();

}


/* =========================
   REFRESH SELECT
========================= */

function populateVehicleSelectRefresh() {

    const select =
        document.getElementById("vehicle");


    const selectedValue =
        select.value;


    select.innerHTML = `
        <option value="">
            Select vehicle
        </option>
    `;


    vehicles.forEach(function (vehicle) {

        if (!isVehicleRented(vehicle.id)) {

            const option =
                document.createElement("option");


            option.value = vehicle.id;


            option.textContent =
                `${vehicle.name} — ₹${vehicle.price}/day`;


            select.appendChild(option);

        }

    });


    select.value = selectedValue;

}


/* =========================
   DISPLAY RENTALS
========================= */

function displayRentals() {

    const table =
        document.getElementById("rentalTable");


    table.innerHTML = "";


    if (rentals.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" class="empty-row">
                    No rental records yet.
                </td>
            </tr>
        `;

        return;
    }


    rentals.forEach(function (rental) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                #${rental.id}
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
                ₹${rental.total}
            </td>

            <td>

                <span class="status ${
                    rental.status === "Active"
                        ? "active"
                        : "returned"
                }">

                    ${rental.status}

                </span>

            </td>

            <td>

                ${
                    rental.status === "Active"

                    ?

                    `
                    <button
                        class="return-btn"
                        onclick="returnVehicle(${rental.id})">

                        Return

                    </button>
                    `

                    :

                    `<span>Completed</span>`
                }

            </td>

        `;


        table.appendChild(row);

    });

}


/* =========================
   RETURN VEHICLE
========================= */

function returnVehicle(rentalId) {

    const rental =
        rentals.find(function (item) {

            return item.id === rentalId;

        });


    if (!rental) {

        showMessage(
            "Rental record not found.",
            "error"
        );

        return;
    }


    if (rental.status === "Returned") {

        showMessage(
            "This vehicle has already been returned.",
            "error"
        );

        return;
    }


    rental.status = "Returned";

    rental.returnDate =
        new Date().toLocaleDateString("en-IN");


    saveData();


    displayVehicles();

    populateVehicleSelectRefresh();

    displayRentals();

    updateStats();


    showMessage(
        `Vehicle returned successfully. Rental ID: ${rental.id}`,
        "success"
    );

}


/* =========================
   STATISTICS
========================= */

function updateStats() {

    const totalVehicles =
        vehicles.length;


    const availableVehicles =
        vehicles.filter(function (vehicle) {

            return !isVehicleRented(vehicle.id);

        }).length;


    const activeRentals =
        rentals.filter(function (rental) {

            return rental.status === "Active";

        }).length;


    const revenue =
        rentals.reduce(function (sum, rental) {

            return sum + rental.total;

        }, 0);


    document.getElementById(
        "totalVehicles"
    ).textContent =
        totalVehicles;


    document.getElementById(
        "availableVehicles"
    ).textContent =
        availableVehicles;


    document.getElementById(
        "activeRentals"
    ).textContent =
        activeRentals;


    document.getElementById(
        "totalRevenue"
    ).textContent =
        `₹${revenue}`;

}


/* =========================
   SAVE DATA
========================= */

function saveData() {

    localStorage.setItem(
        "motivoRentals",
        JSON.stringify(rentals)
    );


    localStorage.setItem(
        "motivoNextRentalId",
        nextRentalId
    );

}


/* =========================
   MESSAGE
========================= */

function showMessage(text, type) {

    const message =
        document.getElementById("message");


    message.textContent = text;

    message.className =
        `message ${type}`;


    setTimeout(function () {

        message.textContent = "";

        message.className = "message";

    }, 4000);

}
