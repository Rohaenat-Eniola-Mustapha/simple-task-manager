# Simple Task Manager

## Project Overview

The Simple Task Manager is a web application designed to help users efficiently organize and track their daily tasks. It provides a straightforward interface for managing personal to-do lists, enhancing productivity by making it easy to create, update, and view tasks.

## Features

* **User Authentication:** Users can securely create accounts and log in.
* **Task Creation:** Authenticated users can create new tasks with details (ee.g., title, description).
* **Task Management:** Users can mark tasks as complete or incomplete.
* **Task Listing:** Users can view a comprehensive list of their tasks.

# Phase 1

## Tech Stack

The Simple Task Manager is built using a modern MERN-like stack:

* **Frontend:** [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
* **Backend:** [Node.js](https://nodejs.org/en) with [Express.js](https://expressjs.com/)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud-hosted NoSQL Database)

## Getting Started

Follow these steps to set up and run the Simple Task Manager on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/en/) (v20.x or higher recommended)
* [npm](https://www.npmjs.com/) (usually comes with Node.js)
* A [MongoDB Atlas](https://www.mongodb.com/atlas) account and cluster setup.

### 1. Clone the Repository

```bash
git clone [https://github.com/Rohaenat-Eniola-Mustapha/simple-task-manager.git](https://github.com/Rohaenat-Eniola-Mustapha/simple-task-manager.git)
cd simple-task-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```
* In the backend/ directory, create a file named .env and add your MongoDB Atlas connection string and a JWT secret:
```Code
MONGO_URI=
JWT_SECRET=
PORT=
```

* Run backend tests
```bash
npm test
npm start
```

### 3. Frontend Setup
Open a new terminal (keep the backend server running).
Navigate to the frontend directory:

```bash
cd ../frontend
npm install
npm test
npm start
```

### **CI/CD Status**

```markdown
## CI/CD Pipeline

This project utilizes Azure Pipelines for Continuous Integration (CI). The pipeline is configured to automatically lint and test both the frontend (React/TypeScript) and backend (Node.js/Express) components on every push and Pull Request to the `develop` and `main` branches.

* **Azure Pipelines Status:**
    [![Build Status](https://dev.azure.com/ALU-Rohaenat/SimpleTaskMgr/_build/results?buildId=7&view=results)

    **Current Status Note:** The CI pipeline is currently encountering a "No hosted parallelism has been purchased or granted" error, which prevents it from running. A request for a free parallelism grant has been submitted to Microsoft Azure DevOps. This issue does not affect the local development and functionality of the application.
```

## Usage

1.  **Register an Account:** Access the application in your browser and use the registration form to create a new user account.
2.  **Log In:** Use your registered credentials to log into the application.
3.  **Manage Tasks:** Once logged in, you can add new tasks, mark existing tasks as complete, and view your personalized list of to-dos.

## Future Enhancements

* Implementing user authentication with JWT tokens.
* Adding task categories or tags.
* Integrating a calendar view for tasks.
* Implementing search and filter functionalities for tasks.
* Improving UI/UX for a more responsive and intuitive experience.

# Phase 2

## Infrastructure as Code (Terraform)

This project uses Terraform to provision all necessary Azure cloud resources:

* Azure Resource Group
* Azure Container Registry (ACR)
* Azure CosmosDB (MongoDB API)
* Azure Container Apps Environment
* Azure Container Apps (Backend & Frontend)

## Contenarization

Both the backend and frontend are containerized using Docker.
Local development can be orchestrated with:

```bash
docker-compose up --build
```

### Live Deployed URLs (Azure Container Apps)

* Frontend: https://stm-frontend-92cyrveb.agreeablecliff-5f0b89d6.westus.azurecontainerapps.io

* Backend: https://stm-backend-92cyrveb.agreeablecliff-5f0b89d6.westus.azurecontainerapps.io

## How to run Locally (Docker)

### Prerequisites

* Docker & Docker Compose Installed

### Running the project
```bash
docker-compose up --build
```

* Video Demo: https://youtu.be/FOFoFyaJeYY

## Author

Rohaenat Eniola Mustapha