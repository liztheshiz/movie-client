import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', Genre: 'Thriller', Director: 'Christopher Nolan', ImagePath: 'https://m.media-amazon.com/images/I/51p3oAsXNmL._AC_.jpg' },
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', Genre: 'Drama', Director: 'Frank Darabont', ImagePath: 'https://m.media-amazon.com/images/I/512G9J05RJL._AC_SY445_.jpg' },
                { _id: 3, Title: 'Gladiator', Description: 'A former Roman General sets out to exact vengeance against the corrupt emporer who murdered his family and sent him into slavery.', Genre: 'Drama', ImagePath: 'https://m.media-amazon.com/images/I/71sj8Yt20qL._AC_SY679_.jpg' }
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

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