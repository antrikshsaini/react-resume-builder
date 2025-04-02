# React Resume Builder Frontend

This repository contains the frontend component of a full-stack resume builder application. Built with ReactJS and Material UI, this application allows users to create professional resumes through a user-friendly, step-by-step input process. It features secure login/signup functionality, various resume template options, and PDF download capabilities.

**Key Features:**

* **User-Friendly Interface:** Intuitive step-by-step form for easy resume creation.
* **Secure Authentication:** Login and signup functionality to protect user data.
* **Template Selection:** Choose from a variety of professional resume templates.
* **PDF Download:** Generate and download resumes in PDF format.
* **State Management:** Utilizes Redux for efficient frontend state management.
* **Modern UI:** Implemented with Material UI for a clean and responsive design.
* **Dockerized Deployment:** Easily deployed using Docker containers.

**Backend Integration:**

This frontend application is designed to work in conjunction with a robust backend built using Django and MongoDB. The backend manages user data, resume generation, and provides RESTful APIs for CRUD operations.

## Getting Started

### Prerequisites

* Node.js and npm (or yarn) installed.
* Docker Desktop (for containerized deployment).
* * **Backend Server Running:** The backend server must be running for full functionality.


### Local Development

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create `.env` file:**

    Create a `.env` file in the root directory of the project and add the following environment variable:

    ```
    REACT_APP_API_URL=http://localhost:3000
    ```

    **Note:** Ensure your backend is running on `http://localhost:3000` or update the `REACT_APP_API_URL` accordingly.

4.  **Start the development server:**

    ```bash
    npm start
    ```

    The application will run on `http://localhost:3000`.

### Docker Deployment

1.  **Install Docker Desktop:**

    Ensure Docker Desktop is installed and running on your system.

2.  **Build and run the Docker container:**

    ```bash
    docker-compose up --build
    ```

    The application will be accessible at `http://localhost:3000`.

3.  **To stop and remove the container:**

    ```bash
    docker-compose down
    ```

### Pushing to Docker Hub

1.  **Login to Docker Hub:**

    ```bash
    docker login
    ```

2.  **Tag the Docker image:**

    ```bash
    docker tag react-resume-builder-frontend <your_dockerhub_username>/react-resume-builder-frontend:latest
    ```

    Replace `<your_dockerhub_username>` with your Docker Hub username.

3.  **Push the image to Docker Hub:**

    ```bash
    docker push <your_dockerhub_username>/react-resume-builder-frontend:latest
    ```

### Cleaning Up Docker Images

1.  **Remove all unused images:**

    ```bash
    docker system prune -a
    ```

    **Warning:** This command will remove all unused images and containers.



### Application Screenshots

#### Home Page

![Screenshot 2025-03-31 at 6 03 54 PM](https://github.com/user-attachments/assets/6d6192c5-c09c-4843-a768-fa8f6799fbb7)

![Screenshot 2025-03-31 at 6 04 18 PM](https://github.com/user-attachments/assets/168c15a8-53b2-40cc-80be-9ce20cc6dff8)

#### Login Page

![Screenshot 2025-03-31 at 6 05 09 PM](https://github.com/user-attachments/assets/6765edb3-cd33-476e-a8df-76e680055279)

#### Sign up Page

![Screenshot 2025-03-31 at 6 05 33 PM](https://github.com/user-attachments/assets/7c075edc-7d96-4c04-bceb-66c635aeacac)

#### Steps to build Resume

<img width="1274" alt="Screenshot 2025-03-31 at 6 06 17 PM" src="https://github.com/user-attachments/assets/f455b23d-c981-4ee6-a2aa-69424e2a4cd2" />

![Screenshot 2025-03-31 at 6 12 41 PM](https://github.com/user-attachments/assets/f509b8c8-c1bc-453f-a560-e9ac122810f6)

![Screenshot 2025-03-31 at 6 15 01 PM](https://github.com/user-attachments/assets/6684125a-26c4-4785-9fde-2576b2c6d4c2)

#### Template View

![Screenshot 2025-03-31 at 6 14 40 PM](https://github.com/user-attachments/assets/090b4ce4-3a26-46e8-bccf-ecd01e640ff1)

#### Dashboard

![Screenshot 2025-03-31 at 6 15 32 PM](https://github.com/user-attachments/assets/07785ce0-2bd3-4e76-b5a2-2f5d263d148d)

### Future Improvements

* Implement more resume template options.
* Add advanced formatting and customization features.
* Improve user experience with real-time preview and editing.
* Enhance security measures for user data.
* Add more comprehensive testing.
* Implement better error handling.

This README provides a comprehensive guide to setting up and running the React Resume Builder Frontend. If you encounter any issues or have suggestions for improvements, please feel free to contribute.
