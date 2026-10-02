function rentVehicle() {

  var customer =
    document.getElementById("customer").value;

  var vehicle =
    document.getElementById("vehicle").value;

  var days =
    document.getElementById("days").value;


  // Check input

  if (
    customer == "" ||
    vehicle == "" ||
    days == ""
  ) {

    alert("Please fill all details.");

    return;
  }


  // Rent per day

  var rent;

  if (vehicle == "Honda City") {

    rent = 2500;

  } else {

    rent = 1500;
  }


  // Calculate total rent

  var total = rent * days;


  // Display rental details

  document.getElementById("rentalInfo").innerHTML =

    "<b>Customer:</b> " + customer +

    "<br><br>" +

    "<b>Vehicle:</b> " + vehicle +

    "<br><br>" +

    "<b>Rent / Day:</b> ₹" + rent +

    "<br><br>" +

    "<b>Rental Days:</b> " + days +

    "<br><br>" +

    "<b>Total Price:</b> ₹" + total;


  // Success message

  document.getElementById("message").innerHTML =
    "Rental successful!";


  // Change vehicle status

  if (vehicle == "Honda City") {

    document.getElementById(
      "hondaStatus"
    ).innerHTML = "Rented";

    document.getElementById(
      "hondaStatus"
    ).className = "rented";

  } else {

    document.getElementById(
      "swiftStatus"
    ).innerHTML = "Rented";

    document.getElementById(
      "swiftStatus"
    ).className = "rented";
  }
}