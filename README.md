# Rivet Code Challenge

This application was developed by Scott Kirschner for the Rivet front-end developer challenge. 

## Getting Started

- Clone the project and navigate to the root directory

### Server 
This app provides the ability to upload images which are hosted via Cloudinary. In order to use this functionality you must have the api running on the server provided.  
- Navigate to the  `server` directory and run `npm install` 
- In the root of the `server` directory create a file called `.env` and be sure to put the period in the begining of the file name.      
    - Note there is NO .local appending .env
    - This file stores the API credentials for Cloudinary
- In `.env` add the following:

    ```
    CLOUDINARY_NAME=<cloudinary name>
    CLOUDINARY_API_KEY=<api key>
    CLOUDINARY_API_SECRET=<api secret>
    ```
    - The credentials will be sent via email. 
- From the root of the `server` directory run `npm start` and you should see the following message in your terminal:
    ```
    listening on port 3001
    ```

### Front End
- Navigate to the `frontend` directory and run `npm install`
- In the root of the `frontend` directory create a file called `.env.local` and be sure to put the period in the begining of the file name.      
    - Note there IS .local appending .env
    - This file stores the API credentials for Rivet
- In `.env` add the following:
    ```
    REACT_APP_API_URL=https://codechallenge.rivet.work/api/v1
    REACT_APP_API_TOKEN=<your api token>
    ```
- From the root of the `frontend` directory run `npm start`


## Questions?
Please reach out to scottakirschner@gmail.com