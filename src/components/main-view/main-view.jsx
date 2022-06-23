import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter as Router, Route } from "react-router-dom";

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

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({ user: null });
    }

    // When a movie button is clicked, sets selectedMovie to that movie
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }


    // LIFECYCLE METHODS

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        // If no user is present, displays LoginView. When user logs in, user is passed as a prop to LoginView
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view" />;

        if (selectedMovie) {
            return (
                <Row className="justify-content-md-center main-view">
                    <Col sm={10}>
                        <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    </Col>
                </Row>
            );
        }

        return (
            <Row className="justify-content-md-center movies-list">
                {movies.map(movie =>
                    <Col sm={6} md={4} lg={3}>
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    </Col>
                )}
            </Row>
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