# Dribble - Remote Code Executor (Online IDE) - Backend

## Description
This repository contains the backend code for a Remote Code Executor (The Online IDE). The backend is built using Node.js and Express frameworks and uses Docker to create a virtual environment for running code in different languages, including C++, Java, and Python. The application allows users to execute and test their code online, providing a powerful and collaborative coding experience.

## Tech Stack
- Node.js
- Express
- Docker

## Installation
Follow these steps to clone the repository, set up Docker, and start using the Remote Code Executor backend:

## Prerequisites
1. Make sure you have Node.js and npm installed on your system.
2. Install Docker or Docker Desktop to build and run the Docker images.

## Clone the Repository
### `https://github.com/imDrew259/Dribble_Backend.git`

## Installation
### `npm install`

## Run the Backend Server
### `npm start`
The backend server will start running at [http://localhost:8080](http://localhost:8080)

## Set Up Docker Images
Before running the backend, you need to build the Docker images for C++, Java, and Python. Navigate to the Dockerfiles directory and build the images:
### `cd Dockerfiles`

### `docker build -t cpp:v1 -f DockerCPP .`
### `docker build -t python:v1 -f DockerPython .`
### `docker build -t java:v1 -f DockerJava .`

## How to Use
1. Ensure the backend server is up and running.
2. Use the frontend application (React-based) to interact with the backend API and execute code online [https://github.com/imDrew259/Dribble_Frontend](https://github.com/imDrew259/Dribble_Frontend) .

## Support and Contributions
If you find this project helpful or like the Online IDE, please consider giving this repository a star. Contributions are welcome! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
