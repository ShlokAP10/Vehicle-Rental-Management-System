
import java.util.ArrayList;
import java.util.Scanner;


// VEHICLE CLASS
class Vehicle {

    int id;
    String name;
    String type;
    double price;
    boolean available;

    Vehicle(int id, String name, String type, double price) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.available = true;
    }

    void display() {
        System.out.println(
            id + " | " + name + " | " + type +
            " | ₹" + price + " per day | " +
            (available ? "Available" : "Rented")
        );
    }
}


// CUSTOMER CLASS
class Customer {

    String name;
    String phone;

    Customer(String name, String phone) {
        this.name = name;
        this.phone = phone;
    }
}


// RENTAL CLASS
class Rental {

    int id;
    Customer customer;
    Vehicle vehicle;
    int days;
    double total;
    boolean active;

    Rental(int id, Customer customer, Vehicle vehicle, int days) {

        this.id = id;
        this.customer = customer;
        this.vehicle = vehicle;
        this.days = days;

        total = vehicle.price * days;

        active = true;

        vehicle.available = false;
    }

    void display() {

        System.out.println(
            id + " | " +
            customer.name + " | " +
            vehicle.name + " | " +
            days + " days | ₹" +
            total + " | " +
            (active ? "Active" : "Returned")
        );
    }
}


// MAIN CLASS
public class VehicleRentalManagementSystem {

    static ArrayList<Vehicle> vehicles =
        new ArrayList<>();

    static ArrayList<Customer> customers =
        new ArrayList<>();

    static ArrayList<Rental> rentals =
        new ArrayList<>();

    static Scanner scanner =
        new Scanner(System.in);

    static int rentalId = 1;


    // ADD VEHICLES
    static void addVehicles() {

        vehicles.add(
            new Vehicle(1, "Honda City", "Car", 2500)
        );

        vehicles.add(
            new Vehicle(2, "Maruti Swift", "Car", 1500)
        );

        vehicles.add(
            new Vehicle(3, "Hyundai Creta", "SUV", 2200)
        );

        vehicles.add(
            new Vehicle(4, "Toyota Fortuner", "SUV", 4000)
        );

        vehicles.add(
            new Vehicle(5, "Royal Enfield", "Bike", 900)
        );

        vehicles.add(
            new Vehicle(6, "Yamaha MT-15", "Bike", 700)
        );
    }


    // SHOW VEHICLES
    static void showVehicles() {

        System.out.println("\n--- VEHICLES ---");

        for (Vehicle vehicle : vehicles) {
            vehicle.display();
        }
    }


    // FIND VEHICLE
    static Vehicle findVehicle(int id) {

        for (Vehicle vehicle : vehicles) {

            if (vehicle.id == id) {
                return vehicle;
            }
        }

        return null;
    }


    // RENT VEHICLE
    static void rentVehicle() {

        scanner.nextLine();

        System.out.print("Customer Name: ");
        String name = scanner.nextLine();

        System.out.print("Phone Number: ");
        String phone = scanner.nextLine();

        showVehicles();

        System.out.print("Enter Vehicle ID: ");
        int vehicleId = scanner.nextInt();

        Vehicle vehicle = findVehicle(vehicleId);

        if (vehicle == null) {

            System.out.println("Vehicle not found.");

            return;
        }

        if (!vehicle.available) {

            System.out.println("Vehicle is already rented.");

            return;
        }

        System.out.print("Enter number of days: ");
        int days = scanner.nextInt();

        if (days <= 0) {

            System.out.println("Invalid number of days.");

            return;
        }

        Customer customer =
            new Customer(name, phone);

        customers.add(customer);

        Rental rental =
            new Rental(
                rentalId,
                customer,
                vehicle,
                days
            );

        rentals.add(rental);

        System.out.println(
            "\nRental successful!"
        );

        System.out.println(
            "Rental ID: " + rentalId
        );

        System.out.println(
            "Total Amount: ₹" + rental.total
        );

        rentalId++;
    }


    // RETURN VEHICLE
    static void returnVehicle() {

        System.out.print("Enter Rental ID: ");
        int id = scanner.nextInt();

        for (Rental rental : rentals) {

            if (rental.id == id) {

                if (!rental.active) {

                    System.out.println(
                        "Vehicle already returned."
                    );

                    return;
                }

                rental.active = false;
                rental.vehicle.available = true;

                System.out.println(
                    "Vehicle returned successfully."
                );

                return;
            }
        }

        System.out.println(
            "Rental not found."
        );
    }


    // SHOW RENTALS
    static void showRentals() {

        System.out.println("\n--- RENTAL RECORDS ---");

        if (rentals.size() == 0) {

            System.out.println(
                "No rental records."
            );

            return;
        }

        for (Rental rental : rentals) {
            rental.display();
        }
    }


    // MAIN METHOD
    public static void main(String[] args) {

        addVehicles();

        int choice;

        do {

            System.out.println(
                "\n===== VEHICLE RENTAL SYSTEM ====="
            );

            System.out.println(
                "1. Show Vehicles"
            );

            System.out.println(
                "2. Rent Vehicle"
            );

            System.out.println(
                "3. Return Vehicle"
            );

            System.out.println(
                "4. Show Rentals"
            );

            System.out.println(
                "5. Exit"
            );

            System.out.print(
                "Enter choice: "
            );

            choice = scanner.nextInt();


            switch (choice) {

                case 1:
                    showVehicles();
                    break;

                case 2:
                    rentVehicle();
                    break;

                case 3:
                    returnVehicle();
                    break;

                case 4:
                    showRentals();
                    break;

                case 5:
                    System.out.println(
                        "Thank you!"
                    );
                    break;

                default:
                    System.out.println(
                        "Invalid choice."
                    );
            }

        } while (choice != 5);

        scanner.close();
    }
}
```
