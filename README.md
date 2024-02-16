# Instastaff

InstaStaff is an application that simplifies the process of matching labor with work requestsfor healthcare professionals. InstaStaff helps medical professionals find work opportunities and assists healthcare facilities in finding qualified staff quickly. It acts as a platform where both parties can easily connect and manage their staffing needs. 🌟

## Getting Started 🚀

Install my-project with npm

```bash
  git clone 'this-repo-url'
  cd 'app-name'
  npm install
```

## Usage 🛠️

Server-Side Configuration

Environment Variables
Ensure to set up environment variables. You can use the provided .env.example file as a template. Rename it to .env and fill in the necessary details.

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
cd 'path-to-react-app'
npm start
```

You can now access the application at http://localhost:3001.

## Environment Variables 🌍

To run this project, you will need to add the following environment variables to your .env file

```
API_KEY for MAPS_JAVASCRIPT_API
API_KEY for MAILGUN
```

## Folder Structure 📁

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

## Features 🌟

#### Job Matching 🤝

Quick Shift Posting & Viewing: Allows admins to post shifts easily, with robust search and filter options for healthcare professionals to find suitable jobs.

Interactive Job Details: Enables users to manage shifts directly from job listings, including adding or canceling shifts and earning rewards for interaction.

#### Flexible Scheduling 📅

Varied Opportunities in Downtown Toronto: Offers a broad selection of job types across healthcare facilities, catering to diverse schedules and career objectives.
Ease of Navigation: Designed for effortless exploration of job opportunities, enhancing user experience.

#### Seamless Integration 🛠️

Simplified Staffing Management: Streamlines processes for healthcare facilities to find qualified staff efficiently.
Geospatial and Calendar Features: Integrates geospatial tools for job distance assessment and a calendar view for organized schedule management.

#### User-Friendly Interface 👥

Secure Access: Utilizes Auth0 for robust authentication, ensuring data security.

Visual Engagement: Features animated interfaces for an intuitive and appealing user experience.'

Detailed Profile Insights: Provides a comprehensive profile page displaying rewards, shift statistics, and job booking overviews, aiding in efficient work and reward management.

## Demo

Client Navigation
!["Demo of Client View"](public/readme_videos/demo_gif.gif)

Admin Navigation
!["Demo of Admin View"](public/readme_videos/admin_post_job.gif)

## Built With

![Postgressql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

## License

This project is open-sourced under the MIT License.

This revised README includes a clear overview, detailed setup instructions, a simplified folder structure for quick reference, enhanced demo section with placeholders for actual demonstration media, and sections for API reference, contributing, and licensing. Adjust the placeholders and specific details according to your project's needs.
