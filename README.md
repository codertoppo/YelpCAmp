# YelpCamp

A full-stack web application where users can discover, review, and share campgrounds from around the world. This project is built with Node.js, Express, and MongoDB, following the MVC (Model-View-Controller) architecture.

## Live Demo

You can view a live demo of the project here: **[https://yelpcamp-hpew.onrender.com/](https://yelpcamp-hpew.onrender.com/)**

---

## Features

* **User Authentication**: Secure user registration and login using Passport.js.
* **Campground Management**: Authenticated users can create, edit, and delete their own campground listings.
* **Image Uploads**: Integration with Cloudinary for seamless image uploads and storage.
* **Interactive Maps**: Campgrounds are displayed on a cluster map using Mapbox for easy visualization.
* **Reviews and Ratings**: Users can leave reviews and ratings for campgrounds.
* **Authorization**: Users can only edit or delete campgrounds and reviews that they have created.
* **Responsive Design**: A clean and modern UI built with Bootstrap that works on all devices.

---

## Technologies Used

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose
* **View Engine**: EJS (Embedded JavaScript)
* **Authentication**: Passport.js (Local Strategy)
* **Image Hosting**: Cloudinary
* **Mapping**: Mapbox
* **Styling**: Bootstrap 5

---

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/YelpCamp.git](https://github.com/your-username/YelpCamp.git)
    cd YelpCamp
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env` in the root of the project and add the following, replacing the placeholder values with your own secret keys:
    ```
    DB_URL=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_KEY=your_cloudinary_api_key
    CLOUDINARY_SECRET=your_cloudinary_api_secret
    MAPBOX_TOKEN=your_mapbox_api_token
    SECRET=a_strong_secret_for_session
    ```

4.  **Start the server:**
    ```bash
    node app.js
    ```
    The application will be running at `http://localhost:3000`.

---

## Environment Variables

To run this project, you will need to set the following environment variables.

* `DB_URL`: The connection string for your MongoDB database (e.g., from MongoDB Atlas).
* `CLOUDINARY_CLOUD_NAME`: Your cloud name from your Cloudinary dashboard.
* `CLOUDINARY_KEY`: The API Key from your Cloudinary dashboard.
* `CLOUDINARY_SECRET`: The API Secret from your Cloudinary dashboard.
* `MAPBOX_TOKEN`: Your public access token from your Mapbox account.
* `SECRET`: A random, long string used to sign the session cookie.

---

## Deployment

This application is ready to be deployed on services like Render, Heroku, or any other platform that supports Node.js applications. Remember to set the environment variables in the deployment service's settings and **do not** commit your `.env` file to GitHub.
