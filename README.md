# Burger Builder

Single page application where authenticated users can build and order their own burgers. Application is built using React, Redux, Firebase and upgraded to react hooks. Working on this learning project guided by Maximilian Schwarzmüller in addition to the features mentioned, covered also responsivness, routing, testing, custom hooks, HOC, generators (redux-saga) etc.

## How to run

__Make sure that Node.js, NPM are installed__

1) Install the dependencies using `npm install`
2) Put your firebase web API key in .env file (root folder) using `REACT_APP_FIREBASE_API_KEY` 
3) Run `npm start`
4) Configure firebase to use proper authentication. Default configuration implies 'Email/password' sign-in method and database rules set to:
`
{
  "rules": {
    "ingredients": {
        ".read": "true",
          ".write": "true"
      },
      "orders": {
        ".read": "auth != null",
          ".write": "auth != null",
            ".indexOn": ["userId"]
      }
  }
}
`

Feel free to play around.
