# Flash Sales App

Flash Sales App is a web-based application built using **.NET Core** and **Angular 15** with **TypeScript**. It allows users to add, edit, and remove products while managing a shopping cart and setting simulated sale dates. The application is designed to handle flash sales efficiently, providing real-time updates for products and price changes.

## Screenshot
![Dashboard](https://github.com/user-attachments/assets/21f3b828-866c-41c9-bc1a-abf15db9dc2e)

## Features

- **Product Management**: Add, delete, and manage product details including sale prices and dates.
- **Shopping Cart**: Easily add products to the cart and calculate total prices.
- **Simulated Sale Date**: Set and simulate a sale date to view dynamic price changes for products.
- **Real-time Cart Updates**: Automatically updates the cart and adjusts the total as items are added or removed.

## Tech Stack

- **Backend**: .NET Core
- **Frontend**: Angular 15, TypeScript
- **Database**: Entity Framework (In-Memory for development)
- **Build Tools**: npm, Angular CLI

## Installation

To set up the Flash Sales App, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/leporejoseph/flash_sales_app.git
    cd flash_sales_app
    ```

2. **Install .NET Core dependencies**:
    Ensure you have the .NET Core SDK installed, then restore the dependencies:
    ```sh
    dotnet restore
    ```

3. **Install Angular dependencies**:
    Navigate to the `ClientApp` folder and install the Angular dependencies:
    ```sh
    cd ClientApp
    npm install
    ```

4. **Run the Application**:
    Start both the backend and frontend applications:
    ```sh
    dotnet run
    cd ClientApp
    ng serve
    ```

    The application will be available at `http://localhost:5000` for the backend and `http://localhost:4200` for the frontend.

## Usage

1. **Add Products**: Navigate to the "Add Product" section to input product details such as name, price, quantity, sale date, and sale price.
2. **View Products**: See all available products in the "Product List" section and manage them by adding them to the cart or deleting them.
3. **Manage Cart**: Items added to the cart are automatically reflected, and the total is updated in real time. You can remove items or clear the cart entirely.
4. **Simulate Sale Dates**: Set a simulated date to see how future sale prices affect the total.

## Directory Structure

```sh
flash_sales_app/
├── flash_sales_app.sln              # Solution file
├── Program.cs                       # Main entry point
├── appsettings.json                 # Application settings
├── ClientApp/                       # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── cart/                # Shopping cart component
│   │   │   ├── product-form/        # Product form component
│   │   │   ├── product-list/        # Product list component
│   │   │   ├── services/            # Services for product and cart management
│   │   │   ├── simulated-date/      # Simulated date component
│   │   └── assets/                  # Static assets
├── Controllers/
│   ├── ProductsController.cs        # API for product management
│   └── SalesController.cs           # API for sale management
├── Data/
│   └── AppDbContext.cs              # Database context for Entity Framework
├── Models/
│   ├── Product.cs                   # Product model
│   └── Sale.cs                      # Sale model
└── wwwroot/                         # Static files for the backend
    └── favicon.ico
