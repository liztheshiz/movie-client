import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import { Navbar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
    // CUSTOM METHODS

    // Gets movie list from database and adds list to local 'movies' var
    getMovies(token) {
        axios.get('https://cinemadatabase.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            this.setState({
                movies: res.data
            });
        }).catch(err => console.log(err));
    }

    // When user successfully logs in, saves user in the state, and user + JWT in local storage
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }


    // LIFECYCLE METHODS

    constructor() {
        super();
        this.state = {
            movies: [],
            user: null
        };
    }

    render() {
        const { movies, user } = this.state;

        // If no user is present, displays LoginView. When user logs in, user is passed as a prop to LoginView
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Router>
                <Navbar />
                <Row className="justify-content-md-center movies-list">
                    <Switch>
                        <Route exact path="/" render={() => {
                            return movies.map(m => (
                                <Col sm={6} md={4} lg={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            ))
                        }} />
                        <Route path="/movies/:movieId" render={({ match, history }) => {
                            return (
                                <Col md={10}>
                                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                                </Col>
                            )
                        }} />
                    </Switch>
                </Row>
            </Router>
        );
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }
}