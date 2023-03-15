<H1 align ="center" > MERN BLOG  </h1>
<h5  align ="center"> 
Fullstack open source blogging application made with MongoDB, Express, React & Nodejs (MERN) </h5>
<br/>

  * [Configuration and Setup](#configuration-and-setup)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Database](#database)
  * [📸 Screenshots](#screenshots)
  * [Author](#author)
  * [License](#license)



## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the Frontend on one terminal and the Backend on the other terminal)

In the first terminal

```
$ cd Frontend
$ npm install (to install frontend-side dependencies)
$ npm run  start (to start the frontend)
```

In the second terminal

- cd Backend and Set environment variables in config.env under ./config
- Create your mongoDB connection url, which you'll use as your MONGO_URI
- Supply the following credentials

```
#  ---  Config.env  ---

NODE_ENV = development
PORT =5000
URI =http://localhost:3000
MONGO_URI =
JWT_SECRET_KEY =
JWT_EXPIRE = 60m
RESET_PASSWORD_EXPIRE = 3600000 

# Nodemailer

SMTP_HOST =smtp.gmail.com
SMTP_PORT =587
EMAIL_USERNAME = example@gmail.com
EMAIL_PASS = your_password
```


```
# --- Terminal ---

$ npm install (to install backend-side dependencies)
$ npm start (to start the backend)
```


##  Key Features

- User registration and login
- Authentication using JWT Tokens
- Story searching  and pagination 
- CRUD operations (Story create, read, update and delete)
- Upload user ımages and story ımages  to the server
- Liking  stories and adding stories  to the Reading list
- Commenting  on the story
- Skeleton loading effect
- Responsive Design

<br/>

##  Technologies used

This project was created using the following technologies.

####  Frontend 

- [React js ](https://www.npmjs.com/package/react) - JavaScript library that is used for building user interfaces specifically for single-page applications
- [React Hooks  ](https://reactjs.org/docs/hooks-intro.html) - For managing and centralizing application state
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - To handle routing
- [axios](https://www.npmjs.com/package/axios) - For making Api calls
- [Css](https://developer.mozilla.org/en-US/docs/Web/CSS) - For User Interface
- [CK-Editor](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html) - Rich Text Editor 
- [uuid](https://www.npmjs.com/package/uuid) - For random id generator
- [React icons](https://react-icons.github.io/react-icons/) -
 Small library that helps you add icons  to your react apps.


####  Backend 


- [Node js](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [Mongoose  ](https://reactjs.org/docs/hooks-intro.html) - For modeling and mapping MongoDB data to JavaScript
- [express-async-handler](https://react-icons.github.io/react-icons/) - Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers 
- [jsonwebtoken  ](https://reactjs.org/docs/hooks-intro.html) - For authentication
- [bcryptjs](https://www.npmjs.com/package/react-router-dom) - For data encryption
- [Nodemailer](https://www.npmjs.com/package/axios) - Send e-mails from Node.js
- [dotenv](https://developer.mozilla.org/en-US/docs/Web/CSS) - Zero Dependency module that loads environment variables
- [multer](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html) - Node.js middleware for uploading files 
- [slugify](https://www.npmjs.com/package/uuid) - For encoding titles into a URL-friendly format
- [cors](https://www.npmjs.com/package/uuid) - Provides a Connect/Express middleware


####  Database 

 - [MongoDB ](https://www.npmjs.com/package/uuid) - It provides a free cloud service to store MongoDB collections.
 


 ##  Screenshots 
 


![picture1](https://user-images.githubusercontent.com/72153125/157872654-6a7b1a45-bf7d-4bdb-b69a-fcb10591e052.png)
---- -

![login](https://user-images.githubusercontent.com/72153125/157872607-e96550d9-3003-4235-bae0-abf94df2467a.png)
--- - 
![register](https://user-images.githubusercontent.com/72153125/157872629-f05248b1-46ca-4b56-8b8e-990f097a696d.png)
--- - 
![picture2](https://user-images.githubusercontent.com/72153125/157872962-082f9454-bc62-419e-9fbb-8e5e679ef420.png)
--- - 
![picture7](https://user-images.githubusercontent.com/72153125/157872738-8d58c03a-d9ae-44ed-a01e-654390c8ef57.png)
--- - 
![picture5](https://user-images.githubusercontent.com/72153125/157872730-f7bfbc8a-47aa-4170-b0a6-19fd376e5077.png)
--- - 
![picture3](https://user-images.githubusercontent.com/72153125/157872690-5006e20e-c3d5-4bda-b624-1351b66f1c3b.png)
--- - 
![picture4](https://user-images.githubusercontent.com/72153125/157872702-1dfcdeae-70fa-4a54-a943-735ca954fca6.png)

--- - 
![picture6](https://user-images.githubusercontent.com/72153125/157872733-e558f6fe-3478-434e-8546-b84568bcfc44.png)
--- - 
![forgotPassword](https://user-images.githubusercontent.com/72153125/157872587-c3c3a7a0-dafe-4257-bbd4-19ac9f53b1ea.png)


## Author

- Github: [@Muhammet-Yildiz](https://github.com/Muhammet-Yildiz)
- Linkedin: [@muhammet-yildiz](https://www.linkedin.com/in/muhammet-yıldız-841908224/)
- Email: [yildiz.m.muhammet@gmail.com](mailto:yildiz.m.muhammet@gmail.com)

## License

MIT License

Copyright (c) 2022 Muhammet Yıldız

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
