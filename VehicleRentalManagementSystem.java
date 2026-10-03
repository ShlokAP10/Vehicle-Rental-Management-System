import java.util.ArrayList;
import java.util.Scanner;


/* =========================================
   VEHICLE CLASS
========================================= */

class Vehicle {

    private int id;
    private String name;
    private String type;
    private String registrationNumber;
    private double pricePerDay;
    private boolean available;


    public Vehicle(
            int id,
            String name,
            String type,
            String registrationNumber,
            double pricePerDay) {

        this.id = id;
        this.name = name;
        this.type = type;
        this.registrationNumber = registrationNumber;
        this.pricePerDay = pricePerDay;

        available = true;
    }


    public int getId() {
        return id;
    }


    public String getName() {
        return name;
    }


    public String getType() {
        return type;
    }


    public double getPricePerDay() {
        return pricePerDay;
    }


    public boolean isAvailable() {
        return available;
    }


    public void setAvailable(boolean available) {
        this.available = available;
    }


    public void display() {

        System.out.println(
            id + "\t" +
            name + "\t" +
            type + "\t" +
            registrationNumber + "\t" +
            "Rs." + pricePerDay + "\t" +
            (available ? "Available" : "Rented")
        );
    }
}


/* =========================================
   CUSTOMER CLASS
========================================= */

class Customer {

    private int id;
    private String name;
    private String phone;


    public Customer(
            int id,
            String name,
            String phone) {

        this.id = id;
        this.name = name;
        this.phone = phone;
    }


    public int getId() {
        return id;
    }


    public String getName() {
        return name;
    }


    public String getPhone() {
        return phone;
    }


    public void display() {

        System.out.println(
            id + "\t" +
            name + "\t" +
            phone
        );
    }
}


/* =========================================
   RENTAL CLASS
========================================= */

class Rental {

    private int rentalId;
    private Customer customer;
    private Vehicle vehicle;
    private int days;
    private double totalAmount;
    private boolean active;


    public Rental(
            int rentalId,
            Customer customer,
            Vehicle vehicle,
            int days) {

        this.rentalId = rentalId;
        this.customer = customer;
        this.vehicle = vehicle;
        this.days = days;

        totalAmount =
            vehicle.getPricePerDay() * days;

        active = true;
    }


    public int getRentalId() {
        return rentalId;
    }


    public Vehicle getVehicle() {
        return vehicle;
    }


    public boolean isActive() {
        return active;
    }


    public double getTotalAmount() {
        return totalAmount;
    }


    public void returnVehicle() {

        active = false;

        vehicle.setAvailable(true);
    }


    public void display() {

        System.out.println(
            "Rental ID : " + rentalId
        );

        System.out.println(
            "Customer  : " +
            customer.getName()
        );

        System.out.println(
            "Vehicle   : " +
            vehicle.getName()
        );

        System.out.println(
            "Days      : " + days
        );

        System.out.println(
            "Amount    : Rs." +
            totalAmount
        );

        System.out.println(
            "Status    : " +
            (active ? "Active" : "Returned")
        );

        System.out.println(
            "----------------------------------"
        );
    }
}


/* =========================================
   MAIN MANAGEMENT SYSTEM
========================================= */

public class VehicleRentalManagementSystem {

    static Scanner scanner =
        new Scanner(System.in);


    static ArrayList<Vehicle> vehicles =
        new ArrayList<>();


    static ArrayList<Customer> customers =
        new ArrayList<>();


    static ArrayList<Rental> rentals =
        new ArrayList<>();


    static int nextRentalId = 1;


    /* =====================================
       LOAD VEHICLES
    ===================================== */

    public static void loadVehicles() {

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
                "Toyota Fortuner",
                "SUV",
                "MH03EF9012",
                3500
            )
        );


        vehicles.add(
            new Vehicle(
                104,
                "Hyundai Creta",
                "SUV",
                "MH04GH3456",
                2800
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
                750
            )
        );
    }


    /* =====================================
       DISPLAY VEHICLES
    ===================================== */

    public static void displayVehicles() {

        System.out.println(
            "\nID\tName\t\tType\tRegistration\tRate\tStatus"
        );

        System.out.println(
            "-------------------------------------------------------------"
        );


        for (Vehicle vehicle : vehicles) {

            vehicle.display();
        }
    }


    /* =====================================
       FIND VEHICLE
    ===================================== */

    public static Vehicle findVehicle(int id) {

        for (Vehicle vehicle : vehicles) {

            if (vehicle.getId() == id) {

                return vehicle;
            }
        }

        return null;
    }


    /* =====================================
       ADD CUSTOMER
    ===================================== */

    public static void addCustomer() {

        System.out.print(
            "\nEnter customer ID: "
        );

        int id = scanner.nextInt();

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
            "\nCustomer added successfully."
        );
    }


    /* =====================================
       DISPLAY CUSTOMERS
    ===================================== */

    public static void displayCustomers() {

        if (customers.size() == 0) {

            System.out.println(
                "\nNo customers found."
            );

            return;
        }


        System.out.println(
            "\nID\tName\t\tPhone"
        );

        System.out.println(
            "--------------------------------"
        );


        for (Customer customer : customers) {

            customer.display();
        }
    }


    /* =====================================
       FIND CUSTOMER
    ===================================== */

    public static Customer findCustomer(int id) {

        for (Customer customer : customers) {

            if (customer.getId() == id) {

                return customer;
            }
        }

        return null;
    }


    /* =====================================
       RENT VEHICLE
    ===================================== */

    public static void rentVehicle() {

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
                "Number of days must be greater than zero."
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


    /* =====================================
       RETURN VEHICLE
    ===================================== */

    public static void returnVehicle() {

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

            if (rental.getRentalId() == rentalId) {

                if (!rental.isActive()) {

                    System.out.println(
                        "Vehicle has already been returned."
                    );

                    return;
                }


                rental.returnVehicle();


                System.out.println(
                    "\nVehicle returned successfully."
                );

                return;
            }
        }


        System.out.println(
            "Rental ID not found."
        );
    }


    /* =====================================
       DISPLAY RENTALS
    ===================================== */

    public static void displayRentals() {

        if (rentals.size() == 0) {

            System.out.println(
                "\nNo rental records available."
            );

            return;
        }


        System.out.println(
            "\n========== RENTAL RECORDS =========="
        );


        for (Rental rental : rentals) {

            rental.display();
        }
    }


    /* =====================================
       MAIN MENU
    ===================================== */

    public static void main(String[] args) {

        loadVehicles();


        int choice;


        do {

            System.out.println(
                "\n========================================"
            );

            System.out.println(
                "       VEHICLE RENTAL MANAGEMENT"
            );

            System.out.println(
                "========================================"
            );

            System.out.println(
                "1. View Vehicles"
            );

            System.out.println(
                "2. Add Customer"
            );

            System.out.println(
                "3. View Customers"
            );

            System.out.println(
                "4. Rent Vehicle"
            );

            System.out.println(
                "5. Return Vehicle"
            );

            System.out.println(
                "6. View Rental Records"
            );

            System.out.println(
                "7. Exit"
            );


            System.out.print(
                "\nEnter your choice: "
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
                    "\nThank you for using the system."
                );

            }

            else {

                System.out.println(
                    "\nInvalid choice."
                );
            }


        } while (choice != 7);


        scanner.close();
    }
}
