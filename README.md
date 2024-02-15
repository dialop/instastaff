# Instastaff

InstaStaff is an application that simplifies the process of matching labor with work requestsfor healthcare professionals. InstaStaff helps medical professionals find work opportunities and assists healthcare facilities in finding qualified staff quickly. It acts as a platform where both parties can easily connect and manage their staffing needs.

## Installation

Install my-project with npm

```bash
  git clone 'this-repo-url'
  cd 'app-name'
  npm install
```

## Usage

Server-Side
Environment Variables
Ensure to set up environment variables. You can use the provided .env.example file as a template. Rename it to .env and fill in the necessary details.

Setting Up the Database
Instastaff uses PostgreSQL for the database. Here's how to set it up:

Run Schema Files: Execute schema files to create database tables:

```
node resetdb.js

```

Seed the Database (Optional): If you want to populate the database with sample data, run the seed files:

```
node resetdb.js
```

Running the Express Server
To start the server, run the following command:

```
cd 'app-name'
cd server
npm run dev

```

Your server will now be running at http://localhost:3000.

Client-Side

Start the React App:

```
npm start
```

You can now access the application at http://localhost:3001.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

## Folder Structure

```
my-app
├── README.md
├── assets
├── bin
├── db
│   ├── schema
│   └── seeds
├── lib
├── node_modules
├── public
│   └── stylesheets
├── routes
│   └── api
├── src
│   ├── assets
│   ├── components
│   │   ├── home
│   │   ├── job_posting
│   │   ├── layout
│   │   ├── map
│   │   ├── profile
│   │   └── user
│   ├── context
│   ├── helpers
│   ├── hooks
│   ├── styles
│   └── App.js
├── views
└── .gitignore
```

## Demo

!["Demo of Client View"](public/readme_videos/demo.mp4)

!["Demo of Admin View"](public/readme_videos/admin_post_job.gif)

## Built With

![Postgressql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

## License

Create React App is open source software [MIT](https://choosealicense.com/licenses/mit/)
