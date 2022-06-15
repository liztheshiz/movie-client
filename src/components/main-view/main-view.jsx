import React from 'react';
import axios from 'axios';

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

    // When a movie button is clicked, sets selectedMovie to that movie
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view" />;

        if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;

        return (
            <div className="main-view">
                {movies.map(movie =>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                )}
            </div>
        );
    }
}