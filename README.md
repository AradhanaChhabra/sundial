# Sundial

Welcome to the Sundial project! This project is a visualization tool for time-related data.

## Table of Contents

- [Getting Started](#getting-started)
  - [Running Locally](#running-locally)
  - [Using the Hosted Site](#using-the-hosted-site)
- [Working](#working)
- [Screenshot](#screenshot)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Running Locally

To run Sundial locally on your machine, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/AradhanaChhabra/sundial.git
   cd sundial
   ```

2. **Install dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:

   ```sh
   npm install
   ```

3. **Start the development server**:

   ```sh
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`. You should see the Sundial application running.

### Using the Hosted Site

If you prefer not to run the project locally, you can use the hosted version of Sundial available at [https://sundial-aradhana.vercel.app/](https://sundial-aradhana.vercel.app/).

## Working

- Each KPI card has two modes:
  - View Mode: the data is shown for the selected metric & segment
  - Edit Mode: selector inputs for for the metric and segment.
- When in View Mode, clicking anywhere switches to Edit Mode
- When In Edit Mode, clicking on the create/save button should switch to View Mode.
- KPI card:
  - a plus (”+”) icon shows on both sides of a card on hover.
  - clicking on these icons add a new card in the respective position (left/right).
  - newly card starts in Edit Mode.
- Responsiveness:
  - The maximum number of cards in a row are 3 irrespective of the screen width.
  - The site is responsive across screen sizes

## Screenshot

Here is a screenshot of Sundial in action:

## Folder Structure

Here's an overview of the main folders and files in this project:

```
sundial/
├── public/
│   ├── index.html      # Main HTML file
│   └── assets/         # Static assets (images, fonts, etc.)
├── src/
│   ├── components/     # Reusable React components such as chat, button etc. with their respective css file
│   ├── context/        # Hook to handle query and return data and loading state
│   ├── utils/          # Utility functions and helpers
│   ├── App.js          # Main application component
│   ├── index.js        # Entry point for the React application
│   └── ...             # Other configuration and setup files
├── .gitignore          # Git ignore file
├── package.json        # Project metadata and dependencies
├── README.md           # This README file
└── ...                 # Other configuration files (e.g., webpack, Babel)
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
