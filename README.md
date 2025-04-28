# Inventory Management

Inventory Management is a web application built with Node.js, Express, and PostgreSQL. It allows users to manage products and categories efficiently, providing features like adding, viewing, and organizing inventory items.

## Features

- **Product Management**: Add, view, and manage products with details like name, price, quantity, and category.
- **Category Management**: Organize products into categories with descriptions and images.
- **Responsive Design**: User-friendly interface with responsive layouts for better usability.
- **Database Integration**: Uses PostgreSQL for storing and managing inventory data.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates, CSS
- **Database**: PostgreSQL
- **Environment Variables**: Managed with `dotenv`

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gazzaar/inventory-management.git
   cd inventory-management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:

Create a PostgreSQL database named `inventory`.
Configure your `.env` file with the following variables:

```markdown
DB_NAME=<your_database_username>
DB_PASS=<your_database_password>
```

4. Populate the database:

   ```bash
   node src/models/populatedb.js
   ```

5. Start the application:

   ```bash
   npm start
   ```

6. Open your browser and navigate to:
   ```markdown
   http://localhost:3000
   ```

## Project Structure

```markdown
src/
├── controllers/ # Handles application logic
├── models/ # Database queries and connection
├── public/ # Static assets (CSS, images, etc.)
├── routes/ # Application routes
├── views/ # EJS templates for rendering pages
└── server.js # Main server file
```

## Usage

Navigate to /products to view and manage products.
Navigate to /categories to view and manage categories.
Use the "Add Product" or "Add Category" buttons to create new entries.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
