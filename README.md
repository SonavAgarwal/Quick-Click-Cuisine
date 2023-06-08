# Quick-Click-Cuisine
Spring 23 35L Project

## Overview

Quick-Click-Cuisine is a client-server web application designed to streamline the food ordering and pickup system. The primary motivation for this application is to alleviate the long queues experienced at food joints, starting with The Study at UCLA. Quick-Click-Cuisine aims to implement features currently provided by the kiosks at the Study, along with additional features such as scheduled ordering and pickup notifications to facilitate online orders.

## Functional Requirements

The application will fulfill the following requirements:

1. **Online Order Placement**: Users must be able to place online orders with selection of entree, drink, side, and their respective options.
2. **Activity Level Indicator**: Users must be able to see the current activity level at The Study and the estimated wait time for their order.
3. **Scheduled Ordering**: Users must be able to schedule orders for a certain time with their preferences saved in advance.
4. **Order History Search**: Users must be able to search through their past orders based on order name, order type, or ingredients.

## Technical Stack

- Front-End: React.js
- Back-End: Python (Flask)
- Database: MongoDB

## Setup

# Frontend

**Client-side**

1. Ensure that Node.js and npm (Node Package Manager) are installed on your system. If not, you can download them from the [official Node.js website](https://nodejs.org/). 

2. Navigate to the frontend directory of the project. 

    ```bash
    cd frontend
    ```

3. Install the required dependencies using the following command:

    ```bash
    npm install
    ```

4. After all dependencies have been installed, you can start the server:

    ```bash
    npm start
    ```

This command starts the React development server, typically running on `http://localhost:3000`. Open this URL in your browser, and you should be able to see the Quick-Click-Cuisine application running.
   
**Restaurant Client**

1. Ensure that Node.js and npm (Node Package Manager) are installed on your system. If not, you can download them from the [official Node.js website](https://nodejs.org/). 

2. Navigate to the restaurant-client directory of the project. 

    ```bash
    cd restaurant-client
    ```

3. Install the required dependencies using the following command:

    ```bash
    npm install
    ```

4. After all dependencies have been installed, you can start the server:

    ```bash
    npm run dev
    ```
    
This command starts the React development server, typically running on `http://localhost:5173`. Open this URL in your browser, and you should be able to see the Quick-Click-Cuisine application running.


Remember, any modifications to the code will automatically refresh the page with the new changes due to React's hot-reloading feature.

#Backend:

To start the Quick-Click-Cuisine backend, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the backend directory of the project
3. Install the required dependencies using the command `pip install -r requirements.txt`.
4. Run the server using the command `python main.py`.
