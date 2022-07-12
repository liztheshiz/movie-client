# Cinema.Database

## Description 

This application loads data from the [CinemaDatabase API](https://cinemadatabase.herokuapp.com/) and displays it for users to see. Users can create and edit accounts, including a modifiable list of favorite movies, and view more details on any movie in the database, including information on genres and directors.

## How to Use This App

When first opening the app, register your own personal account, then log in to view the database and make your own list of favorites!

## Dependencies

- HTML5
- CSS3
- JavaScript (ES6)
- React
- React-DOM
- React-Router-DOM
- React-Bootstrap
- React-Redux
- Redux
- Axios
- PropTypes

## Dev Notes

This project was developed using parcel.

Navigate to project directory and type:

`parcel src/index.html`

Then go to http://localhost:1234 to test website. Browser will automatically refresh when code is altered. Neat!

##### A Note on Parcel

Parcel proved particularly finicky during development and often required deleting and reloading to work correctly. The best workarounds I've found have been to:

1. Close parcel in the terminal, exit from the website in the browser (maybe just close everything while you're at it), delete items in `dist` folder, then rebuild by running parcel again.
2. Open dev tools in the browser, right click on the refresh button, and select "Empty cache and hard reload". This one works 9/10 times, which is not too bad, but it would admittedly be better if it weren't required at all...