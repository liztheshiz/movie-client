import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://cinemadatabase.herokuapp.com/movies')
            .then(res => {
                this.setState({ movies: res.data });
            }).catch(err => {
                console.log(err);
            });
    }

    // When user successfully logs in, sets 'user' prop to that particular user
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    // When a movie button is clicked, sets selectedMovie to that movie
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        // If no user is present, displays LoginView. When user logs in, user is passed as a prop to LoginView
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view" />;

        if (selectedMovie) {
            return (
                <Row>
                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Row>
            );
        }

        return (
            <div className="main-view">
                <h1>CinemaDatabase</h1>
                <div className="movies-list">
                    {movies.map(movie =>
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    )}
                </div>
            </div>
        );
    }
}