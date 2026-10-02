import java.util.ArrayList;

class Vehicle {
  int id;
  String name;
  String number;
  double rent;
  boolean available = true;

  Vehicle(int id, String name, String number, double rent) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.rent = rent;
  }

  void display() {
    System.out.println(
        id + "\t" + name + "\t" + number +
            "\tRs." + rent + "\t" +
            (available ? "Available" : "Rented"));
  }
}

public class VehicleRentalManagementSystem {

  public static void main(String[] args) {

    ArrayList<Vehicle> vehicles = new ArrayList<>();

    vehicles.add(
        new Vehicle(101, "Honda City",
            "MH01AB1234", 2500));

    vehicles.add(
        new Vehicle(102, "Swift",
            "MH02CD5678", 1500));

    System.out.println("VEHICLE RENTAL SYSTEM");

    System.out.println("\nAvailable Vehicles:");

    System.out.println(
        "ID\tName\tNumber\t\tRent\tStatus");

    for (Vehicle v : vehicles) {
      v.display();
    }

    // Rent a vehicle for 3 days
    Vehicle v = vehicles.get(0);

    int days = 3;

    if (v.available) {

      v.available = false;

      double total = v.rent * days;

      System.out.println("\nRental successful.");

      System.out.println(
          "Vehicle: " + v.name);

      System.out.println(
          "Rental Days: " + days);

      System.out.println(
          "Total: Rs." + total);
    }

    // Return the vehicle
    v.available = true;

    System.out.println(
        "\nVehicle returned.");

    System.out.println(
        "System execution completed.");
  }
}