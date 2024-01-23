# Finonex
Home assignment
This project consists of a Node.js server (server.js) and a Node.js client (client.js) for handling live events and storing/retrieving user events in a PostgreSQL database. The project includes a PostgreSQL SQL file for creating the necessary database and table. Additionally, there is a package.json file for managing dependencies and an events.json file containing sample event data.

## Prerequisites
Before running the server and client, make sure you have the following installed:
Node.js: Download Node.js (https://nodejs.org/en)
PostgreSQL: Download PostgreSQL (https://www.postgresql.org/download/)

## Setup
1. Install Dependencies: npm install
2. Database Setup:
   - Execute the SQL commands in the provided PostgreSQL SQL file to create the necessary database and table.
3. Configuration:
  - In the server.js file, update the PostgreSQL connection details in the connectionString variable with your own database username, password, and table name.
4. Run the Server: node client.js
  The client will read events from the events.json file and send them to the server.

## Server Endpoints
- POST /liveEvent:
  - Requires Authorization header with a valid JWT token.
  - Accepts JSON payload containing event data (userId, name, value).
  - Saves the event data to a local JSON file.
- GET /userEvents/:userid:
  - Requires Authorization header with a valid JWT token.
  - Retrieves user events from the PostgreSQL database based on the userid parameter.
 
## Client
The client.js script reads events from the events.json file and sends them to the server's /liveEvent endpoint.
Update the serverUrl and secret variables in the client.js file if needed.

## Example Usage
1. Run the server: npm start
2. Run the client: node client.js






    
