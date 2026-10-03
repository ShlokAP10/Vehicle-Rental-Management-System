import java.util.ArrayList;
import java.util.Scanner;




class Vehicle {

    private int id;
    private String name;
    private String type;
    private String number;
    private double pricePerDay;
    private boolean available;


    Vehicle(
        int id,
        String name,
        String type,
        String number,
        double pricePerDay
    ) {

        this.id = id;
        this.name = name;
        this.type = type;
        this.number = number;
        this.pricePerDay = pricePerDay;

        available = true;
    }


    int getId() {
        return id;
    }


    String getName() {
        return name;
    }


    double getPricePerDay() {
        return pricePerDay;
    }


    boolean isAvailable() {
        return available;
    }


    void setAvailable(boolean available) {
        this.available = available;
    }


    void display() {

        System.out.println(
            id + " | " +
            name + " | " +
            type + " | " +
            number + " | ₹" +
            pricePerDay + " | " +
            (available ? "Available" : "Rented")
        );

    }

}


/* =========================
   CUSTOMER CLASS
========================= */

class Customer {

    private int id;
    private String name;
    private String phone;


    Customer(
        int id,
        String name,
        String phone
    ) {

        this.id = id;
        this.name = name;
        this.phone = phone;

    }


    int getId() {
        return id;
    }


    void display() {

        System.out.println(
            id + " | " +
            name + " | " +
            phone
        );

    }

}


/* =========================
   RENTAL CLASS
========================= */

class Rental {

    private int id;

    private Customer customer;

    private Vehicle vehicle;

    private int days;

    private double total;

    private boolean active;


    Rental(
        int id,
        Customer customer,
        Vehicle vehicle,
        int days
    ) {

        this.id = id;

        this.customer = customer;

        this.vehicle = vehicle;

        this.days = days;

        total =
            vehicle.getPricePerDay()
            * days;

        active = true;

    }


    int getId() {
        return id;
    }


    boolean isActive() {
        return active;
    }


    void returnVehicle() {

        active = false;

        vehicle.setAvailable(true);

    }


    void display() {

        System.out.println(

            "Rental ID: " + id +

            " | Customer ID: " +
            customer.getId() +

            " | Vehicle: " +
            vehicle.getName() +

            " | Days: " +
            days +

            " | Total: ₹" +
            total +

            " | Status: " +

            (active
                ? "Active"
                : "Returned")

        );

    }

}



public class VehicleRentalManagementSystem {

    static Scanner scanner =
        new Scanner(System.in);


    static ArrayList<Vehicle> vehicles =
        new ArrayList<>();


    static ArrayList<Customer> customers =
        new ArrayList<>();


    static ArrayList<Rental> rentals =
        new ArrayList<>();


    static int nextRentalId = 1001;


    public static void main(String[] args) {

        addVehicles();


        int choice;


        do {

            System.out.println(
                "\n===== VEHICLE RENTAL SYSTEM ====="
            );


            System.out.println(
                "1. Display Vehicles"
            );


            System.out.println(
                "2. Add Customer"
            );


            System.out.println(
                "3. Display Customers"
            );


            System.out.println(
                "4. Rent Vehicle"
            );


            System.out.println(
                "5. Return Vehicle"
            );


            System.out.println(
                "6. Display Rentals"
            );


            System.out.println(
                "7. Exit"
            );


            System.out.print(
                "Enter choice: "
            );


            choice =
                scanner.nextInt();


            if (choice == 1) {

                displayVehicles();

            }

            else if (choice == 2) {

                addCustomer();

            }

            else if (choice == 3) {

                displayCustomers();

            }

            else if (choice == 4) {

                rentVehicle();

            }

            else if (choice == 5) {

                returnVehicle();

            }

            else if (choice == 6) {

                displayRentals();

            }

            else if (choice == 7) {

                System.out.println(
                    "Thank you."
                );

            }

            else {

                System.out.println(
                    "Invalid choice."
                );

            }


        } while (choice != 7);


        scanner.close();

    }


    /* =========================
       ADD VEHICLES
    ========================= */

    static void addVehicles() {

        vehicles.add(
            new Vehicle(
                101,
                "Honda City",
                "Car",
                "MH01AB1234",
                2500
            )
        );


        vehicles.add(
            new Vehicle(
                102,
                "Maruti Swift",
                "Car",
                "MH02CD5678",
                1500
            )
        );


        vehicles.add(
            new Vehicle(
                103,
                "Hyundai Creta",
                "SUV",
                "MH03EF9012",
                2200
            )
        );


        vehicles.add(
            new Vehicle(
                104,
                "Toyota Fortuner",
                "SUV",
                "MH04GH3456",
                4000
            )
        );


        vehicles.add(
            new Vehicle(
                105,
                "Royal Enfield",
                "Bike",
                "MH05IJ7890",
                900
            )
        );


        vehicles.add(
            new Vehicle(
                106,
                "Yamaha MT-15",
                "Bike",
                "MH06KL1234",
                700
            )
        );

    }


    /* =========================
       DISPLAY VEHICLES
    ========================= */

    static void displayVehicles() {

        System.out.println(
            "\nID | Name | Type | Number | Rate | Status"
        );


        System.out.println(
            "------------------------------------------------------"
        );


        for (Vehicle vehicle : vehicles) {

            vehicle.display();

        }

    }


    /* =========================
       FIND VEHICLE
    ========================= */

    static Vehicle findVehicle(int id) {

        for (Vehicle vehicle : vehicles) {

            if (vehicle.getId() == id) {

                return vehicle;

            }

        }


        return null;

    }


    /* =========================
       ADD CUSTOMER
    ========================= */

    static void addCustomer() {

        System.out.print(
            "\nEnter customer ID: "
        );

        int id =
            scanner.nextInt();


        scanner.nextLine();


        System.out.print(
            "Enter customer name: "
        );

        String name =
            scanner.nextLine();


        System.out.print(
            "Enter phone number: "
        );

        String phone =
            scanner.nextLine();


        customers.add(
            new Customer(
                id,
                name,
                phone
            )
        );


        System.out.println(
            "Customer added successfully."
        );

    }


    /* =========================
       DISPLAY CUSTOMERS
    ========================= */

    static void displayCustomers() {

        if (customers.size() == 0) {

            System.out.println(
                "\nNo customers found."
            );

            return;

        }


        System.out.println(
            "\nID | Name | Phone"
        );


        System.out.println(
            "---------------------------"
        );


        for (Customer customer : customers) {

            customer.display();

        }

    }


    /* =========================
       FIND CUSTOMER
    ========================= */

    static Customer findCustomer(int id) {

        for (Customer customer : customers) {

            if (customer.getId() == id) {

                return customer;

            }

        }


        return null;

    }


    /* =========================
       RENT VEHICLE
    ========================= */

    static void rentVehicle() {

        System.out.print(
            "\nEnter customer ID: "
        );

        int customerId =
            scanner.nextInt();


        Customer customer =
            findCustomer(customerId);


        if (customer == null) {

            System.out.println(
                "Customer not found."
            );

            return;

        }


        displayVehicles();


        System.out.print(
            "\nEnter vehicle ID: "
        );

        int vehicleId =
            scanner.nextInt();


        Vehicle vehicle =
            findVehicle(vehicleId);


        if (vehicle == null) {

            System.out.println(
                "Vehicle not found."
            );

            return;

        }


        if (!vehicle.isAvailable()) {

            System.out.println(
                "Vehicle is already rented."
            );

            return;

        }


        System.out.print(
            "Enter number of days: "
        );

        int days =
            scanner.nextInt();


        if (days <= 0) {

            System.out.println(
                "Days must be greater than zero."
            );

            return;

        }


        if (days > 30) {

            System.out.println(
                "Maximum rental period is 30 days."
            );

            return;

        }


        Rental rental =
            new Rental(
                nextRentalId,
                customer,
                vehicle,
                days
            );


        rentals.add(rental);


        nextRentalId++;


        vehicle.setAvailable(false);


        System.out.println(
            "\nRental created successfully."
        );


        rental.display();

    }


    /* =========================
       RETURN VEHICLE
    ========================= */

    static void returnVehicle() {

        if (rentals.size() == 0) {

            System.out.println(
                "\nNo rentals found."
            );

            return;

        }


        System.out.print(
            "\nEnter rental ID: "
        );


        int rentalId =
            scanner.nextInt();


        for (Rental rental : rentals) {

            if (rental.getId() == rentalId) {

                if (!rental.isActive()) {

                    System.out.println(
                        "Vehicle has already been returned."
                    );

                    return;

                }


                rental.returnVehicle();


                System.out.println(
                    "Vehicle returned successfully."
                );


                return;

            }

        }


        System.out.println(
            "Rental ID not found."
        );

    }


    /* =========================
       DISPLAY RENTALS
    ========================= */

    static void displayRentals() {

        if (rentals.size() == 0) {

            System.out.println(
                "\nNo rental records found."
            );

            return;

        }


        System.out.println(
            "\n===== RENTAL RECORDS ====="
        );


        for (Rental rental : rentals) {

            rental.display();

        }

    }

}
