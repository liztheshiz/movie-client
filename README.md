# Cinema.Database

## Description 

This application loads data from the [CinemaDatabase API](https://cinemadatabase.herokuapp.com/) ([GitHub repo](https://github.com/liztheshiz/movie-api)) and displays it for users to see. Users can create and edit accounts, including a modifiable list of favorite movies, and view more details on any movie in the database, including information on genres and directors.

There is a second version of this app called [MyFlix](https://github.com/liztheshiz/movie-Angular-client) that is built using Angular rather than React. Besides the core functionality of the site and the API, the two apps are built entirely separately and can be developed independently of each other.

## Dev instructions

This project was developed using [Parcel](https://parceljs.org/).

To start a dev server, navigate to project directory in the CLI and type:

`parcel src/index.html`

Then go to http://localhost:1234 to test the website. Browser will automatically refresh when code is altered. Neat!

Please note that code pushed to main is automatically deployed. Creating a separate branch is suggested during development; merge with main only when ready for deployment.

#### A Note on Parcel

Parcel proved particularly finicky during development and often required deleting and reloading to work correctly. The best workarounds I've found have been to:

1. Close parcel in the terminal, exit from the website in the browser (maybe just close everything while you're at it), delete items in `dist` folder, then rebuild by running parcel again.
2. Open dev tools in the browser, right click on the refresh button, and select "Empty cache and hard reload". This one works 9/10 times, which is not too bad, but it would admittedly be better if it weren't required at all...

## Deploy instructions

This app is deployed on [Netlify](https://www.netlify.com/) using Parcel. As noted above, the deploy is automatically updated as code is update in the main branch on GitHub, so no extra step is necessary. Simply ensure that main contains the most recent code intended for deployment.

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