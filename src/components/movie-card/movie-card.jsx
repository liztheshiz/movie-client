import React from 'react';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
            <div className="movie-card">
                <div className="movie-card-title">
                    {movie.Title} <button className="movie-card-button" onClick={() => { onMovieClick(movie); }}>View details</button>
                </div>
            </div>
        );
    }
}