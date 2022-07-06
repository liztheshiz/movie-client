import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MoviesList(props) {
    //const { movies, favMovies, listType, removeFromFavorites, name } = props;
    const { movies, visibilityFilter, listType, removeFromFavorites, name } = props;

    let filteredMovies = movies;

    /*if (isProfile) {
        favMovies.forEach(i => {
            movie = movies.find(m => m._id === favMovies[i]);
            movies.push(movie);
        })
    }*/

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    return filteredMovies.map(m => (
        <Col md={3} key={m._id}>
            <MovieCard movie={m} />
        </Col>
    ));

    /*const moviesList = movies.filter(m => {
        if (listType === "profile") return movies.includes(m._id);
        if (listType === "genre") return m.Genre.Name === name;
        if (listType === "director") return m.Director.Name === name;
    })

    return (
        <Row>
            {moviesList.map(m =>
                <Col sm={6} lg={4} xl={3} key={m._id}>
                    <MovieCard movie={m} listType={listType} removeFromFavorites={removeFromFavorites} />
                </Col>
            )}
        </Row>
    );*/
}

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

export default connect(mapStateToProps)(MoviesList);

/*MoviesList.propTypes = {
    listType: PropTypes.string.isRequired,
    removeFromFavorites: PropTypes.func,
    name: PropTypes.string
}*/