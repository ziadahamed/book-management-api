# Book Management REST API – Node.js + TypeScript

This is a simple Book Management API built using **Node.js** and **TypeScript**. It supports full CRUD operations on books and CSV file upload for bulk import. This was developed as part of the **Creuto Node.js Assignment**.

---

##  Features

- 🔹 Create, Read, Update, Delete books
- 🔹 Bulk CSV import with row-wise validation
- 🔹 UUID-based book IDs
- 🔹 Centralized error handling
- 🔹 Request logging using Morgan
- 🔹 MVC folder structure
- 🔹 Uses `.env` for environment config
- 🔹 TypeScript for type safety

---

##  Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **Multer** – for CSV upload
- **Morgan** – for logging
- **UUID** – for unique IDs
- **dotenv** – for environment variables

---

##  Project Folder Structure

book-management-api/
├── src/
│ ├── controllers/ # All route handler logic
│ ├── models/ # Book interface and storage
│ ├── routes/ # Express routes
│ ├── middleware/ # Error handler
│ └── app.ts # Main entry file
├── uploads/ # Uploaded CSVs (temporary)
├── tests/ # (for future unit tests)
├── .env # Environment config
├── tsconfig.json # TypeScript config
├── package.json # NPM config


---

##  How to Setup & Run Locally

### 1. Clone or Download the Repo


git clone https://github.com/ziadahamed/book-management-api.git
cd book-management-api
2. Install Dependencies

npm install
3. Create .env File
In the root folder:

PORT=3000

4. Run in Development Mode
5. 
npm run dev
Server will start at:
 http://localhost:3000

Scripts

"scripts": {
  "dev": "nodemon src/app.ts",
  "build": "tsc",
  "start": "node dist/app.js"
}
API Endpoints
Method	Endpoint	Description
GET	/books	Get all books
GET	/books/:id	Get one book by ID
POST	/books	Add a new book
PUT	/books/:id	Update book by ID
DELETE	/books/:id	Delete book by ID
POST	/books/import	Upload CSV and import books

Sample CSV Format (for /books/import)
Use this content in a .csv file:

title,author,publishedYear
The Alchemist,Paulo Coelho,1988
Atomic Habits,James Clear,2018
Zero to One,Peter Thiel,2014
In Postman:

Method: POST

URL: http://localhost:3000/books/import

Body → form-data → Key = file (type = File)

Postman Testing Guide
Add a Book
Method: POST

URL: /books

Body (raw → JSON):

{
  "title": "Deep Work",
  "author": "Cal Newport",
  "publishedYear": 2016
}
Update a Book
Method: PUT

URL: /books/<book-id>

Body:

{
  "title": "Deep Work - Updated",
  "author": "Cal Newport",
  "publishedYear": 2024
}
Delete a Book
Method: DELETE

URL: /books/<book-id>

Get All Books
Method: GET

URL: /books

Developer Notes
Books are stored in-memory (no DB used)

CSV rows are manually validated (no csv-parser used)

Project uses clean and simple TypeScript-based Express structure


Postman collection

postman collection.json is file here 

Assignment Reference
Built for: Creuto Node.js Task 2025
By: Ziad Ahamed
